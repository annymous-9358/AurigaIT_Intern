import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import styles from './CartPage.module.css';
import MainLayout from '../components/templates/MainLayout';
import Icon from '../components/atoms/Icon';
import { ArrowBack, Add, Remove, Delete } from '@mui/icons-material';

const CartPage = () => {
  const navigate = useNavigate();
  const { items: cartItems, updateQuantity, removeFromCart, cartTotal, cartSavings } = useCart();

  const handleQuantityChange = (cartId, change) => {
    const item = cartItems.find(item => item.cartId === cartId);
    if (item) {
      updateQuantity(cartId, item.quantity + change);
    }
  };

  const handleRemoveItem = (cartId) => {
    removeFromCart(cartId);
  };

  const totalAmount = cartTotal;
  const totalSavings = cartSavings;
  const deliveryCharge = totalAmount > 500 ? 0 : 40;
  const finalAmount = totalAmount + deliveryCharge;

  return (
    <MainLayout>
      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <div className={styles.backButton} onClick={() => navigate('/')}>
            <Icon icon={<ArrowBack />} size="medium" />
            <span>My Cart ({cartItems.length})</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <div className={styles.emptyCartIcon}>🛒</div>
            <h2>Your cart is empty!</h2>
            <p>Add items to it now.</p>
            <button 
              className={styles.shopNowBtn}
              onClick={() => navigate('/')}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.cartItems}>
              {cartItems.map(item => (
                <div key={item.cartId} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.title}</h3>
                    <p className={styles.itemBrand}>Brand: {item.brand || item.category}</p>
                    
                    <div className={styles.priceSection}>
                      <span className={styles.currentPrice}>₹{Math.floor(item.price * 80).toLocaleString()}</span>
                      <span className={styles.originalPrice}>₹{Math.floor((item.originalPrice || item.price * 1.5) * 80).toLocaleString()}</span>
                      <span className={styles.discount}>{item.discount || 25}% off</span>
                    </div>
                    
                    <p className={styles.delivery}>{item.delivery || "Free delivery by tomorrow"}</p>
                    
                    <div className={styles.itemActions}>
                      <div className={styles.quantityControls}>
                        <button 
                          className={styles.quantityBtn}
                          onClick={() => handleQuantityChange(item.cartId, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Icon icon={<Remove />} size="small" />
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button 
                          className={styles.quantityBtn}
                          onClick={() => handleQuantityChange(item.cartId, 1)}
                        >
                          <Icon icon={<Add />} size="small" />
                        </button>
                      </div>
                      
                      <button 
                        className={styles.removeBtn}
                        onClick={() => handleRemoveItem(item.cartId)}
                      >
                        <Icon icon={<Delete />} size="small" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.priceDetails}>
              <h3>Price Details</h3>
              <div className={styles.priceBreakdown}>
                <div className={styles.priceRow}>
                  <span>Price ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{Math.floor((totalAmount + totalSavings) * 80).toLocaleString()}</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Discount</span>
                  <span className={styles.savings}>−₹{Math.floor(totalSavings * 80).toLocaleString()}</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Delivery Charges</span>
                  <span className={deliveryCharge === 0 ? styles.free : ''}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.priceRow + ' ' + styles.totalAmount}>
                  <span>Total Amount</span>
                  <span>₹{Math.floor(finalAmount * 80).toLocaleString()}</span>
                </div>
                <p className={styles.savingsText}>
                  You will save ₹{Math.floor(totalSavings * 80).toLocaleString()} on this order
                </p>
              </div>
              
              <button 
                className={styles.placeOrderBtn}
                onClick={() => navigate('/order')}
                disabled={cartItems.length === 0}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;
