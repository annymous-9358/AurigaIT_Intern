import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import styles from './MainLayout.module.css';
import Header from '../../organisms/Header';

const MainLayout = ({ 
  children, 
  onSearch, 
  onLoginClick, 
  isLoggedIn,
  userDropdownItems 
}) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div className={styles.layoutContainer}>
      <Header
        onSearch={onSearch}
        onLoginClick={onLoginClick}
        onCartClick={handleCartClick}
        cartItemCount={cartCount}
        isLoggedIn={isLoggedIn}
        userDropdownItems={userDropdownItems}
      />
      
      <main className={styles.mainContent}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>About</h4>
            <ul>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Flipkart Stories</li>
              <li>Press</li>
              <li>Flipkart Wholesale</li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Help</h4>
            <ul>
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Returns</li>
              <li>FAQ</li>
              <li>Report Infringement</li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Policy</h4>
            <ul>
              <li>Return Policy</li>
              <li>Terms Of Use</li>
              <li>Security</li>
              <li>Privacy</li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Social</h4>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div>© 20025 Flipkart.com</div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
