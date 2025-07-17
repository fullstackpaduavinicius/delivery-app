// src/pages/AdminPage.tsx
import React from 'react';
import styled from 'styled-components';
import AdminPanel from '../components/AdminPanel';
import useProductStore from '../hooks/useProductStore';

const AdminContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ConnectionStatus = styled.div<{ $isConnected: boolean }>`
  display: inline-block;
  padding: 5px 10px;
  background: ${props => props.$isConnected ? '#4CAF50' : '#F44336'};
  color: white;
  border-radius: 4px;
  font-size: 14px;
  margin-left: 15px;
`;

const AdminPage: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    isConnected 
  } = useProductStore();

  return (
    <AdminContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1>Painel Administrativo</h1>
        <ConnectionStatus $isConnected={isConnected}>
          {isConnected ? 'Conectado' : 'Desconectado'}
        </ConnectionStatus>
      </div>
      
      <AdminPanel
        products={products}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
      />
    </AdminContainer>
  );
};

export default AdminPage;