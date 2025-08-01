import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        const newItem = {
          ...action.payload,
          quantity: 1,
          cartId: `cart_${action.payload.id}`,
          originalPrice: Math.floor(action.payload.price * 1.5),
          discount: Math.floor(Math.random() * 40) + 20,
          brand: action.payload.category,
          delivery: "Free delivery by tomorrow"
        };
        
        return {
          ...state,
          items: [...state.items, newItem]
        };
      }
    }
    
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.cartId !== action.payload.cartId)
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.cartId === action.payload.cartId
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      };
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: []
      };
    
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload
      };
    
    default:
      return state;
  }
};

const initialState = {
  items: []
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('flipkart-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        if (Array.isArray(cartItems) && cartItems.length > 0) {
          console.log('Loading cart from localStorage:', cartItems.length, 'items');
          dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartItems });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('flipkart-cart');
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('flipkart-cart', JSON.stringify(state.items));
        console.log('Cart saved to localStorage:', state.items.length, 'items');
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [state.items, isLoaded]);

  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  };

  const removeFromCart = (cartId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { cartId } });
  };

  const updateQuantity = (cartId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { cartId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const cartSavings = state.items.reduce((savings, item) => {
    const original = item.originalPrice || item.price * 1.5;
    return savings + ((original - item.price) * item.quantity);
  }, 0);

  const value = {
    items: state.items,
    cartCount,
    cartTotal,
    cartSavings,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CART_ACTIONS };
