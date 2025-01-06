import api from './Services/axiosInstance';

const fetchProducts = async () => {
  try {
    const response = await api.get('/products'); 
    console.log('Products:', response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

fetchProducts();
