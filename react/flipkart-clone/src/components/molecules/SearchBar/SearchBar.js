import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';
import Input from '../../atoms/Input';
import Icon from '../../atoms/Icon';
import { Search } from '@mui/icons-material';
import { useProducts } from '../../../hooks/useApi';

const SearchBar = ({ 
  placeholder = "Search for products, brands and more", 
  value, 
  onChange, 
  onSearch 
}) => {
  const [searchValue, setSearchValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceTimerRef = useRef(null);
  
  const { data: productsData } = useProducts();
  const allProducts = useMemo(() => productsData?.products || [], [productsData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    const filterSuggestions = useCallback((query) => {
    if (!query.trim() || query.length < 1) {
      return [];
    }

    const queryLower = query.toLowerCase();
    
    // Get product suggestions with images
    const productSuggestions = allProducts
      .filter(product => 
        product.title?.toLowerCase().includes(queryLower) ||
        product.brand?.toLowerCase().includes(queryLower) ||
        product.category?.toLowerCase().includes(queryLower) ||
        product.description?.toLowerCase().includes(queryLower)
      )
      .slice(0, 6)
      .map(product => ({
        id: product.id,
        text: product.title,
        type: 'product',
        category: product.category,
        brand: product.brand,
        image: product.thumbnail,
        price: product.price
      }));

    // Get trending searches
    const trendingSearches = [
      'iPhone', 'Samsung Galaxy', 'Laptop', 'Headphones', 'Watch', 'Shoes'
    ].filter(term => term.toLowerCase().includes(queryLower))
     .slice(0, 3)
     .map(term => ({
       id: `trending-${term}`,
       text: term,
       type: 'trending'
     }));

    return [...trendingSearches, ...productSuggestions];
  }, [allProducts]);

  const debouncedSearch = useCallback((query) => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set loading state
    setIsLoading(true);

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      const newSuggestions = filterSuggestions(query);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
      setHighlightedIndex(-1);
      setIsLoading(false);
    }, 300); // 300ms debounce
  }, [filterSuggestions]);

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    if (onChange) onChange(e);
    
    if (val.trim().length >= 2) {
      debouncedSearch(val);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
      setHighlightedIndex(-1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        handleSuggestionClick(suggestions[highlightedIndex]);
      } else if (searchValue.trim() && onSearch) {
        onSearch(searchValue);
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const performSearch = (query) => {
    if (query.trim() && onSearch) {
      onSearch(query);
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'product') {
      navigate(`/product/${suggestion.id}`);
    } else if (suggestion.type === 'category') {
      navigate(`/search?category=${suggestion.title}`);
    }
    setShowSuggestions(false);
    setSearchValue('');
    setHighlightedIndex(-1);
  };

  const handleFocus = () => {
    if (searchValue.length >= 2) {
      debouncedSearch(searchValue);
    }
  };

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className={styles.highlight}>{part}</span>
      ) : part
    );
  };

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <div className={styles.searchInputWrapper}>
        <div className={styles.searchIconWrapper}>
          <Icon 
            icon={<Search />} 
            size="small" 
            color="#2874f0"
          />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          autoComplete="off"
        />
      </div>
      
      {showSuggestions && (
        <div className={styles.suggestionsContainer} ref={suggestionsRef}>
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <span>Searching...</span>
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={`${suggestion.type}-${suggestion.id}-${index}`}
                className={`${styles.suggestionItem} ${
                  index === highlightedIndex ? styles.highlighted : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {suggestion.type === 'trending' ? (
                  <div className={styles.trendingSuggestion}>
                    <Icon icon={<Search />} size="small" color="#666" />
                    <span className={styles.trendingText}>
                      {highlightSearchTerm(suggestion.text, searchValue)}
                    </span>
                    <span className={styles.trendingTag}>Trending</span>
                  </div>
                ) : suggestion.type === 'product' ? (
                  <div className={styles.productSuggestion}>
                    {suggestion.image && (
                      <img 
                        src={suggestion.image} 
                        alt={suggestion.text}
                        className={styles.productImage}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className={styles.productInfo}>
                      <span className={styles.productTitle}>
                        {highlightSearchTerm(suggestion.text, searchValue)}
                      </span>
                      {suggestion.category && (
                        <span className={styles.productCategory}>
                          in {suggestion.category}
                        </span>
                      )}
                      {suggestion.price && (
                        <span className={styles.productPrice}>
                          ₹{suggestion.price}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={styles.defaultSuggestion}>
                    <Icon icon={<Search />} size="small" color="#666" />
                    <span className={styles.suggestionText}>
                      {highlightSearchTerm(suggestion.text, searchValue)}
                    </span>
                  </div>
                )}
              </div>
            ))
          ) : searchValue.length >= 1 ? (
            <div className={styles.noResults}>
              <Icon icon={<Search />} size="small" color="#666" />
              <span>No results found for "{searchValue}"</span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
