import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BestOfSection.module.css';

const BestOfSection = ({ title, products = [], bgColor = 'white', category }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleViewAll = () => {
    navigate(`/search?category=${category}`);
  };

  const formatPrice = (price) => {
    return `₹${Math.floor(price * 80)}`;
  };

  const getDiscountPercentage = (product) => {
    return product.discount || Math.floor(Math.random() * 60) + 20;
  };

  const displayProducts = products.slice(0, 6);

  if (!displayProducts.length) return null;

  return (
    <div className={styles.bestOfSection} style={{ backgroundColor: bgColor }}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.viewAllBtn} onClick={handleViewAll}>
            VIEW ALL
            <svg className={styles.arrow} viewBox="0 0 16 16" fill="currentColor">
              <path d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"/>
            </svg>
          </button>
        </div>
        
        <div className={styles.productsGrid}>
          {displayProducts.map((product) => (
            <div 
              key={product.id} 
              className={styles.productCard}
              onClick={() => handleProductClick(product)}
            >
              <div className={styles.imageContainer}>
                <img 
                  src={product.image} 
                  alt={product.title}
                  className={styles.productImage}
                />
              </div>
              
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>
                  {product.title.length > 50 ? `${product.title.substring(0, 50)}...` : product.title}
                </h3>
                
                <div className={styles.brand}>
                  {product.brand || 'Brand'}
                </div>
                
                <div className={styles.priceSection}>
                  <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                  <span className={styles.originalPrice}>₹{Math.floor(product.price * 120)}</span>
                  <span className={styles.discount}>{getDiscountPercentage(product)}% off</span>
                </div>
                
                {product.rating && (
                  <div className={styles.rating}>
                    <span className={styles.ratingValue}>
                      {typeof product.rating === 'object' ? product.rating.rate : product.rating}
                      <svg width="8" height="8" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                        <path d="m8 1 1.9 3.8L14 5.4l-3 2.9.7 4.1L8 10.6 4.3 12.4l.7-4.1L2 5.4l4.1-.6L8 1z" fill="#FFF"/>
                      </svg>
                    </span>
                  </div>
                )}
                
                {product.popular && (
                  <div className={styles.popularBadge}>
                    Popular
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestOfSection;
