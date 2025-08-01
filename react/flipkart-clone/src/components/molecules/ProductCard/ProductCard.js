import React from 'react';
import styles from './ProductCard.module.css';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onProductClick 
}) => {
  const {
    title,
    image,
    currentPrice,
    originalPrice,
    discount,
    rating,
    ratingCount
  } = product;

  const handleCardClick = () => {
    if (onProductClick) onProductClick(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
  };

  return (
    <div className={styles.cardContainer} onClick={handleCardClick}>
      <div className={styles.imageWrapper}>
        <Image 
          src={image} 
          alt={title}
          width="100%"
        />
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{title}</h3>
        {rating && (
          <div className={styles.rating}>
            <span className={styles.ratingValue}>
              {rating} ★
            </span>
            <span className={styles.ratingCount}>
              ({ratingCount?.toLocaleString()})
            </span>
          </div>
        )}
        <div className={styles.priceContainer}>
          <span className={styles.currentPrice}>₹{currentPrice?.toLocaleString()}</span>
          {originalPrice && originalPrice > currentPrice && (
            <>
              <span className={styles.originalPrice}>₹{originalPrice?.toLocaleString()}</span>
              <span className={styles.discount}>{discount}% off</span>
            </>
          )}
        </div>
        <Button 
          variant="primary" 
          size="small"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
