import { useState, useEffect, useCallback, useRef } from 'react';
import { Product } from '../types';

// Configurações específicas para produção
const PRODUCTION_CONFIG = {
  API_URL: process.env.REACT_APP_API_URL || 'https://maverick-backend-kakm.onrender.com',
  WS_URL: process.env.REACT_APP_WS_URL || 'wss://maverick-backend-kakm.onrender.com',
  RECONNECT_DELAY: 5000, // 5 segundos
  MAX_RECONNECT_ATTEMPTS: 5
};

const useProductStore = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const socketRef = useRef<WebSocket | null>(null);

  // Conexão WebSocket robusta para produção
  useEffect(() => {
    const connectWebSocket = () => {
      if (reconnectAttempts >= PRODUCTION_CONFIG.MAX_RECONNECT_ATTEMPTS) {
        console.error('Número máximo de tentativas de reconexão atingido');
        return;
      }

      const ws = new WebSocket(PRODUCTION_CONFIG.WS_URL);
      socketRef.current = ws;
      
      ws.onopen = () => {
        setIsConnected(true);
        setReconnectAttempts(0);
        console.log('Conexão WebSocket estabelecida');
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'PRODUCTS_UPDATED') {
            setProducts(message.data);
          }
        } catch (error) {
          console.error('Erro ao processar mensagem:', error);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        if (reconnectAttempts < PRODUCTION_CONFIG.MAX_RECONNECT_ATTEMPTS) {
          console.log(`Tentando reconectar (${reconnectAttempts + 1}/${PRODUCTION_CONFIG.MAX_RECONNECT_ATTEMPTS})...`);
          setTimeout(connectWebSocket, PRODUCTION_CONFIG.RECONNECT_DELAY);
          setReconnectAttempts(prev => prev + 1);
        }
      };

      ws.onerror = (error) => {
        console.error('Erro na conexão WebSocket:', error);
      };
    };

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [reconnectAttempts]);

  // Carrega produtos com cache e retry
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`${PRODUCTION_CONFIG.API_URL}/api/products`, {
        cache: 'no-cache'
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Falha ao carregar produtos:', error);
      // Tentar novamente após 5 segundos
      setTimeout(fetchProducts, 5000);
    }
  }, []);

  // Sincronização otimizada
  const syncProducts = useCallback(async (updatedProducts: Product[]) => {
    try {
      const response = await fetch(`${PRODUCTION_CONFIG.API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProducts),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`Erro na sincronização: ${await response.text()}`);
      }
    } catch (error) {
      console.error('Falha na sincronização:', error);
      throw error;
    }
  }, []);

  // Operações CRUD
  const addProduct = useCallback(async (productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
    };
    await syncProducts([...products, newProduct]);
  }, [products, syncProducts]);

  const updateProduct = useCallback(async (updatedProduct: Product) => {
    await syncProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  }, [products, syncProducts]);

  const deleteProduct = useCallback(async (productId: string) => {
    await syncProducts(products.filter(p => p.id !== productId));
  }, [products, syncProducts]);

  // Carrega produtos ao iniciar
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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