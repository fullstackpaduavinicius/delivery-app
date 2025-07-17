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

const AdminPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();

  return (
    <AdminContainer>
      <h1>Painel Administrativo</h1>
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