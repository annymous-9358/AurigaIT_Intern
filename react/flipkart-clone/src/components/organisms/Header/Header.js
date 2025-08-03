import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import SearchBar from '../../molecules/SearchBar';
import Dropdown from '../../molecules/Dropdown';
import Icon from '../../atoms/Icon';
import { ShoppingCart, Person, MoreVert } from '@mui/icons-material';

const Header = ({ 
  onSearch, 
  onLoginClick, 
  onCartClick, 
  cartItemCount = 0,
  isLoggedIn = false,
  userDropdownItems = [],
  onUserAction
}) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearch = (searchTerm) => {
    if (onSearch) onSearch(searchTerm);
  };

  const handleUserAction = (action) => {
    if (onUserAction) {
      onUserAction(action);
    } else if (action === 'Logout') {
      if (onLoginClick) {
        onLoginClick(); // This will toggle login state (logout)
      }
    }
    // Handle other actions like 'My Profile', 'Orders', 'Wishlist' here if needed
  };

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection} onClick={handleLogoClick}>
            <div className={styles.logoText}>
              Flipkart<span className={styles.plusSymbol}>+</span>
            </div>
            <div className={styles.tagline}>
              <span className={styles.exploreText}>Explore</span>
              <span className={styles.plusText}>Plus</span>
              <Icon icon={<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgMEw2LjE4MDM0IDMuODE5NjZMMTAgNUw2LjE4MDM0IDYuMTgwMzRMNSAxMEwzLjgxOTY2IDYuMTgwMzRMMCA1TDMuODE5NjYgMy44MTk2Nkw1IDBaIiBmaWxsPSIjRkZFNTAxIi8+Cjwvc3ZnPgo=" alt="plus" />} size="small" />
            </div>
          </div>
          
          <div className={styles.searchSection}>
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for Products, Brands and More"
            />
          </div>
          
          <div className={styles.actionsSection}>
            {isLoggedIn ? (
              <Dropdown
                label="Account"
                items={userDropdownItems}
                onSelect={handleUserAction}
              />
            ) : (
              <div className={styles.actionItem} onClick={onLoginClick}>
                <Icon icon={<Person />} color="white" size="small" />
                <span className={styles.label}>Login</span>
              </div>
            )}
            
            <div className={styles.actionItem}>
              <span className={styles.label}>Become a Seller</span>
            </div>
            
            <div className={styles.cartContainer}>
              <div className={styles.actionItem} onClick={onCartClick}>
                <Icon icon={<ShoppingCart />} color="white" size="small" />
                <span className={styles.label}>Cart</span>
                {cartItemCount > 0 && (
                  <span className={styles.cartBadge}>{cartItemCount}</span>
                )}
              </div>
            </div>
            
            <div className={styles.actionItem + ' ' + styles.moreItem}>
              <Dropdown
                label={<Icon icon={<MoreVert />} color="white" size="small" />}
                items={[
                  'Notification Preferences',
                  'Sell on Flipkart', 
                  '24x7 Customer Care',
                  'Advertise',
                  'Download App'
                ]}
                showArrow={false}
                alignRight={true}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
