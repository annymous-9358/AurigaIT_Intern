const FAKESTORE_API_BASE = 'https://fakestoreapi.in/api';

const fakeStoreRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${FAKESTORE_API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`FakeStore API request failed for ${endpoint}:`, error);
    throw error;
  }
};

const products = {
  getAll: async (params = {}) => {
    try {
      const response = await fakeStoreRequest('/products');
      return {
        products: response.products || [],
        count: response.products ? response.products.length : 0,
        message: response.message || 'Products fetched successfully'
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        products: [],
        count: 0,
        message: 'Failed to fetch products'
      };
    }
  },

  getById: async (id) => {
    try {
      const response = await fakeStoreRequest(`/products/${id}`);
      const product = response.product || response;
      return {
        product: product || null,
        message: product ? 'Product fetched successfully' : 'Product not found'
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      return {
        product: null,
        message: 'Failed to fetch product'
      };
    }
  }
};

const api = {
  products
};

export default api;
