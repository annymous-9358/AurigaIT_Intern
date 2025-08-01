import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import MainLayout from '../components/templates/MainLayout';
import Loading from '../components/atoms/Loading';
import ErrorMessage from '../components/atoms/ErrorMessage';
import styles from './ProductDetail.module.css';
import api from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.products.getById(id);
        setProduct(response.product);
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      addToast(`${product.title.substring(0, 30)}... (${quantity}) added to cart!`, 'success');
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const formatPrice = (price) => {
    return `₹${Math.floor(price * 80)}`; // Convert USD to INR approximately
  };

  const getDiscountPercentage = () => {
    return Math.floor(Math.random() * 60) + 20; // Random discount between 20-80%
  };

  const getOriginalPrice = (price) => {
    return Math.floor(price * 120);
  };

  const handleSearch = (searchTerm) => {
    navigate(`/?search=${searchTerm}`);
  };

  const handleLoginClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const userDropdownItems = [
    'My Profile',
    'Orders', 
    'Wishlist',
    'Logout'
  ];

  if (loading) {
    return (
      <MainLayout>
        <Loading size="large" text="Loading product..." fullWidth />
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <ErrorMessage 
          message={error || "Product not found"}
          onRetry={() => window.location.reload()}
          fullWidth
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.productDetailContainer}>
        <div className={styles.productDetail}>
          <div className={styles.breadcrumb}>
            <span onClick={() => navigate('/')} className={styles.breadcrumbLink}>Home</span>
            <span className={styles.breadcrumbSeparator}> &gt; </span>
            <span className={styles.breadcrumbCurrent}>{product.category}</span>
            <span className={styles.breadcrumbSeparator}> &gt; </span>
            <span className={styles.breadcrumbCurrent}>{product.title}</span>
          </div>

          <div className={styles.productContent}>
            <div className={styles.imageSection}>
              <div className={styles.mainImageContainer}>
                <img 
                  src={product.image} 
                  alt={product.title}
                  className={styles.mainImage}
                />
              </div>
              <div className={styles.actionButtons}>
                <button 
                  className={styles.addToCartBtn}
                  onClick={handleAddToCart}
                >
                  <svg width="16" height="16" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                    <path d="m15.32 2.405-4.07 6.885c-.2.335-.565.54-.955.535h-6.85l.01.08c.03.24.24.42.49.42h7.11c.26 0 .49-.18.49-.42 0-.23-.23-.42-.49-.42h-5.05l.81-1.39h5.71c.26 0 .49-.19.49-.42s-.23-.43-.49-.43h-6.82l.81-1.39h7.58c.26 0 .49-.18.49-.42 0-.23-.23-.42-.49-.42h-8.69l.8-1.39h10.17c.26 0 .49-.18.49-.42s-.23-.42-.49-.42h-11.28c-.26 0-.49.19-.49.42 0 .23.23.42.49.42h.59l-1.78 3.08c-.2.34-.2.77 0 1.11l1.78 3.08c.2.34.57.55.96.55h9.4c.4 0 .76-.21.96-.55l4.07-6.885c.2-.335.2-.765 0-1.1z" fill="#fff"/>
                  </svg>
                  ADD TO CART
                </button>
                <button 
                  className={styles.buyNowBtn}
                  onClick={handleBuyNow}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.32 2.405L4.07 13.66c-.2.2-.45.34-.72.34H.49c-.26 0-.49-.18-.49-.42s.23-.42.49-.42h2.86L14.6 1.695c.2-.2.53-.2.72 0 .2.2.2.52 0 .71z" fill="#fff"/>
                  </svg>
                  BUY NOW
                </button>
              </div>
            </div>

            <div className={styles.infoSection}>
              <h1 className={styles.productTitle}>{product.title}</h1>
              
              {product.rating && (
                <div className={styles.rating}>
                  <span className={styles.ratingValue}>
                    {typeof product.rating === 'object' ? product.rating.rate : product.rating}
                    <svg width="8" height="8" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                      <path d="m8 1 1.9 3.8L14 5.4l-3 2.9.7 4.1L8 10.6 4.3 12.4l.7-4.1L2 5.4l4.1-.6L8 1z" fill="#FFF"/>
                    </svg>
                  </span>
                  <span className={styles.ratingCount}>
                    {typeof product.rating === 'object' ? `${product.rating.count} ratings` : '50+ ratings'}
                  </span>
                </div>
              )}

              <div className={styles.priceSection}>
                <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                <span className={styles.originalPrice}>₹{getOriginalPrice(product.price)}</span>
                <span className={styles.discount}>{getDiscountPercentage()}% off</span>
              </div>

              <div className={styles.highlights}>
                <h3>Product Highlights</h3>
                <ul>
                  <li>Category: {product.category}</li>
                  <li>Premium Quality Product</li>
                  <li>Fast Delivery Available</li>
                  <li>Easy Returns & Exchange</li>
                </ul>
              </div>

              <div className={styles.description}>
                <h3>Product Description</h3>
                <p>{product.description}</p>
              </div>

              <div className={styles.quantitySection}>
                <label>Quantity:</label>
                <select 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className={styles.quantitySelect}
                >
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
