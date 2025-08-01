import React, { useState, useEffect } from 'react';
import styles from './OffersBanner.module.css';

const OffersBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [
    {
      id: 1,
      image: '/images/banners/big-saving-days.svg',
      alt: 'Big Saving Days',
     
    },
    {
      id: 2,
      image: '/images/banners/fashion-week.svg',
      alt: 'Fashion Week',
    
    },
    {
      id: 3,
      image: '/images/banners/electronics-sale.svg',
      alt: 'Electronics Sale',
     
    },
    {
      id: 4,
      image: '/images/banners/home-kitchen.svg',
      alt: 'Home & Kitchen',
     
    },
    {
      id: 5,
      image: '/images/banners/travel-bookings.svg',
      alt: 'Travel Bookings',
   
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [banners.length]);
  
  if (!banners || banners.length === 0) {
    return null;
  }

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className={styles.offersBanner}>
      <div className={styles.sliderContainer}>
        <button 
          className={`${styles.navButton} ${styles.prevButton}`} 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className={styles.slider}>
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
            >
              <img 
                src={banner.image} 
                alt={banner.alt}
                className={styles.bannerImage}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton}`} 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className={styles.indicators}>
        {banners.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OffersBanner;
