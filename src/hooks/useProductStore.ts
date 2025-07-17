// src/hooks/useProductStore.ts
import { useState, useEffect } from 'react';
import { Product } from '../types';

// Função para carregar produtos iniciais (mock)
const loadInitialProducts = (): Product[] => {
  return [
    // Seus produtos iniciais aqui (opcional)
  ];
};

const useProductStore = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Carrega produtos do localStorage ao inicializar
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
        }
      } catch (error) {
        console.error('Error parsing products from localStorage', error);
        // Se houver erro, carrega produtos iniciais
        const initialProducts = loadInitialProducts();
        setProducts(initialProducts);
        localStorage.setItem('products', JSON.stringify(initialProducts));
      }
    } else {
      // Se não houver dados salvos, carrega produtos iniciais
      const initialProducts = loadInitialProducts();
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
    setInitialized(true);
  }, []);

  // Atualiza localStorage quando products mudar
  useEffect(() => {
    if (initialized) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products, initialized]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProductStore;