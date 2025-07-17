// src/hooks/useProductStore.ts
import { useState, useEffect } from 'react';
import { Product } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:3002';

const useProductStore = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Conexão WebSocket para atualizações em tempo real
  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      setIsConnected(true);
      console.log('Conectado ao WebSocket');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'PRODUCTS_UPDATED') {
        setProducts(message.data);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log('Desconectado do WebSocket');
    };

    return () => ws.close();
  }, []);

  // Carrega produtos iniciais da API
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      if (!response.ok) throw new Error('Erro ao carregar produtos');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  // Atualiza produtos no servidor
  const syncProducts = async (updatedProducts: Product[]) => {
    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProducts),
      });
      if (!response.ok) throw new Error('Erro ao sincronizar produtos');
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  // Operações CRUD
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
    };
    const updatedProducts = [...products, newProduct];
    await syncProducts(updatedProducts);
  };

  const updateProduct = async (updatedProduct: Product) => {
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    await syncProducts(updatedProducts);
  };

  const deleteProduct = async (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    await syncProducts(updatedProducts);
  };

  // Carrega produtos ao iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    isConnected,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
  };
};

export default useProductStore;