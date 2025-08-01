import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import MainLayout from '../components/templates/MainLayout';
import Loading from '../components/atoms/Loading';
import ErrorMessage from '../components/atoms/ErrorMessage';
import { useProducts } from '../hooks/useApi';
import styles from './SearchPage.module.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const searchQuery = searchParams.get('q');
  const categoryFilter = searchParams.get('category');

  const { data: productsData, loading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();

  const filterProducts = () => {
    const allProducts = productsData?.products || [];
    
    if (categoryFilter) {
      return allProducts.filter(product => product.category === categoryFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return allProducts.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    return allProducts;
  };

  const filteredProducts = filterProducts();

  const handleAddToCart = (product) => {
    addToCart(product);
    addToast(`${product.title.substring(0, 30)}... added to cart!`, 'success');
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLoginClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const formatPrice = (price) => {
    return `₹${Math.floor(price * 80)}`;
  };

  const getDiscountPercentage = () => {
    return Math.floor(Math.random() * 60) + 20;
  };

  const userDropdownItems = [
    'My Profile',
    'Orders',
    'Wishlist',
    'Logout'
  ];

  const handleRetry = () => {
    refetchProducts();
  };

  const getPageTitle = () => {
    if (categoryFilter) {
      const categoryNames = {
        audio: 'Audio Products',
        mobile: 'Mobile Phones',
        gaming: 'Gaming Products',
        tv: 'Television & Electronics'
      };
      return categoryNames[categoryFilter] || `${categoryFilter} Products`;
    }
    
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    
    return 'All Products';
  };

  if (productsLoading) {
    return (
      <MainLayout
        onSearch={handleSearch}
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        userDropdownItems={userDropdownItems}
      >
        <div className={styles.loadingContainer}>
          <Loading size="large" text="Searching products..." fullWidth />
        </div>
      </MainLayout>
    );
  }

  if (productsError) {
    return (
      <MainLayout
        onSearch={handleSearch}
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        userDropdownItems={userDropdownItems}
      >
        <div className={styles.errorContainer}>
          <ErrorMessage 
            message="Failed to load products. Please check your connection and try again."
            onRetry={handleRetry}
            fullWidth
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <div className={styles.searchPage}>
      <MainLayout
        onSearch={handleSearch}
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        userDropdownItems={userDropdownItems}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>{getPageTitle()}</h1>
            <p className={styles.resultCount}>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h2>No products found</h2>
              <p>
                {searchQuery 
                  ? `No products found for "${searchQuery}"`
                  : `No products found in ${categoryFilter} category`
                }
              </p>
              <button 
                className={styles.backButton}
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={styles.productCard}
                >
                  <div 
                    className={styles.imageContainer}
                    onClick={() => handleProductClick(product)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className={styles.productImage}
                      onError={(e) => {
                        e.target.src = '/images/placeholder-product.png';
                      }}
                    />
                    <div className={styles.discount}>
                      {getDiscountPercentage()}% off
                    </div>
                  </div>
                  
                  <div className={styles.productInfo}>
                    <h3 
                      className={styles.productTitle}
                      onClick={() => handleProductClick(product)}
                    >
                      {product.title}
                    </h3>
                    
                    <div className={styles.rating}>
                      <span className={styles.stars}>★★★★☆</span>
                      <span className={styles.ratingText}>(4.2)</span>
                    </div>
                    
                    <div className={styles.priceContainer}>
                      <span className={styles.currentPrice}>
                        {formatPrice(product.price)}
                      </span>
                      <span className={styles.originalPrice}>
                        {formatPrice(product.price * 1.5)}
                      </span>
                    </div>
                    
                    <button 
                      className={styles.addToCartBtn}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </MainLayout>
    </div>
  );
};

export default SearchPage;
