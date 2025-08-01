import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TopOffersSection.module.css';

const TopOffersSection = ({ products = [] }) => {
  const navigate = useNavigate();

  const topOffers = products.slice(0, 8);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleViewAll = () => {
    navigate('/search');
  };

  const formatPrice = (price) => {
    return `₹${Math.floor(price * 80)}`;
  };

  const getDiscountPercentage = (product) => {
    return product.discount || Math.floor(Math.random() * 60) + 20;
  };

  if (!topOffers.length) return null;

  return (
    <div className={styles.topOffersSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Top Offers</h2>
          <button className={styles.viewAllBtn} onClick={handleViewAll}>
            VIEW ALL
            <svg className={styles.arrow} viewBox="0 0 16 16" fill="currentColor">
              <path d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"/>
            </svg>
          </button>
        </div>
        
        <div className={styles.offersGrid}>
          {topOffers.map((product) => (
            <div 
              key={product.id} 
              className={styles.offerCard}
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
                  {product.title.length > 40 ? `${product.title.substring(0, 40)}...` : product.title}
                </h3>
                
                <div className={styles.brand}>
                  {product.brand || 'Brand'}
                </div>
                
                <div className={styles.priceSection}>
                  <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                  <span className={styles.originalPrice}>₹{Math.floor(product.price * 120)}</span>
                  <span className={styles.discount}>{getDiscountPercentage(product)}% off</span>
                </div>
                
                <div className={styles.offerBadge}>
                  Top Offer
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopOffersSection;
