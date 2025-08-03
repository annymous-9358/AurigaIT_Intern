import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';
import MainLayout from '../components/templates/MainLayout';
import CategoryNav from '../components/organisms/CategoryNav';
import OffersBanner from '../components/organisms/OffersBanner';
import TopOffersSection from '../components/organisms/TopOffersSection';
import BestOfSection from '../components/organisms/BestOfSection';
import Loading from '../components/atoms/Loading';
import ErrorMessage from '../components/atoms/ErrorMessage';
import { 
  useProducts
} from '../hooks/useApi';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, toggleLogin, userDropdownItems } = useLogin();

  const { data: productsData, loading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();

  const displayProducts = productsData?.products || [];
  
  const audioProducts = displayProducts.filter(product => product.category === 'audio') || [];
  const gamingProducts = displayProducts.filter(product => product.category === 'gaming') || [];
  const mobileProducts = displayProducts.filter(product => product.category === 'mobile') || [];
  const tvProducts = displayProducts.filter(product => product.category === 'tv') || [];

  const someProducts = displayProducts.slice(0, 6);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLoginClick = () => {
    toggleLogin();
  };

  const handleCategoryClick = (category) => {
    navigate(`/search?category=${category}`);
  };

  const handleRetry = () => {
    refetchProducts();
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
          <Loading size="large" text="Loading Flipkart..." fullWidth />
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
            message="Failed to load data. Please check your connection and try again."
            onRetry={handleRetry}
            fullWidth
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <div className={styles.homePage}>
      <MainLayout
        onSearch={handleSearch}
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        userDropdownItems={userDropdownItems}
      >
        <div className={styles.mainContent}>
          <CategoryNav onCategoryClick={handleCategoryClick} products={displayProducts} />
          
          <div className={styles.heroSection}>
            <OffersBanner />
          </div>
          
          <TopOffersSection products={displayProducts} />
          <BestOfSection
            title="Best of Audio"
            products={audioProducts}
            bgColor="white"
            category="audio"
          />
          
          <BestOfSection
            title="Best of Mobiles"
            products={mobileProducts}
            bgColor="#f1f3f6"
            category="mobile"
          />
          
          <BestOfSection
            title="Gaming Essentials"
            products={gamingProducts}
            bgColor="white"
            category="gaming"
          />
          
          <BestOfSection
            title="Electronics & TVs"
            products={tvProducts}
            bgColor="#f1f3f6"
            category="tv"
          />

          {audioProducts.length === 0 && gamingProducts.length === 0 && mobileProducts.length === 0 && tvProducts.length === 0 && displayProducts.length > 0 && (
            <BestOfSection
              title="All Products"
              products={someProducts}
              bgColor="white"
              category="all"
            />
          )}
        </div>
      </MainLayout>
    </div>
  );
};

export default HomePage;
