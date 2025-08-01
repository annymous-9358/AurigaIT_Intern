import { useState, useEffect } from 'react';
import api from '../services/api';

const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError(err.message || 'An error occurred');
        setData(null);
        console.error('API call failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export const useProducts = (params = {}) => {
  const { data, loading, error, refetch } = useApi(() => api.products.getAll(params), [JSON.stringify(params)]);
  return {
    data: data, // Return the full API response object, not defaulting to empty array
    loading,
    error,
    refetch
  };
};
