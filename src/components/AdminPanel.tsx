import React, { useState } from 'react';
import { Product } from '../types';
import styled from 'styled-components';

interface AdminPanelProps {
  products: Product[];
  onUpdateProduct: (updatedProduct: Product) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (productId: string) => void;
}

const AdminPanelContainer = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input, textarea, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  textarea {
    min-height: 80px;
  }
`;

const ProductItem = styled.div<{ unavailable: boolean }>`
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  opacity: ${props => props.unavailable ? 0.7 : 1};

  .product-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 15px;
  }

  .product-actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'danger' | 'success' }>`
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => 
    props.variant === 'danger' ? '#dc3545' : 
    props.variant === 'success' ? '#28a745' : 
    '#007bff'};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, 
  onUpdateProduct, 
  onAddProduct,
  onDeleteProduct 
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    available: true,
    category: '',
  });

  const handleAvailabilityToggle = (product: Product) => {
    const updatedProduct = { ...product, available: !product.available };
    onUpdateProduct(updatedProduct);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct({...product});
  };

  const handleSave = () => {
    if (editingProduct) {
      onUpdateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleAddProduct = () => {
    if (
      newProduct.name &&
      newProduct.description &&
      newProduct.category &&
      newProduct.price > 0
    ) {
      onAddProduct(newProduct);
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        image: '',
        available: true,
        category: '',
      });
    } else {
      alert('Preencha todos os campos obrigatórios!');
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      onDeleteProduct(productId);
    }
  };

  return (
    <AdminPanelContainer>
      <h2>Gerenciamento de Produtos</h2>

      <div>
        <h3>Adicionar Novo Produto</h3>
        <FormGroup>
          <label>Nome:</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </FormGroup>
        
        <FormGroup>
          <label>Descrição:</label>
          <textarea
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
        </FormGroup>
        
        <FormGroup>
          <label>Categoria:</label>
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          >
            <option value="">Selecione...</option>
            <option value="Lanches">Lanches</option>
            <option value="Pizzas">Pizzas</option>
            <option value="Bebidas">Bebidas</option>
          </select>
        </FormGroup>
        
        <FormGroup>
          <label>Preço:</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
          />
        </FormGroup>
        
        <FormGroup>
          <label>Imagem (URL):</label>
          <input
            type="text"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
        </FormGroup>
        
        <FormGroup>
          <label>
            <input
              type="checkbox"
              checked={newProduct.available}
              onChange={(e) => setNewProduct({ ...newProduct, available: e.target.checked })}
            />
            Disponível
          </label>
        </FormGroup>
        
        <Button onClick={handleAddProduct}>Adicionar Produto</Button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Produtos Cadastrados ({products.length})</h3>
        {products.map(product => (
          <ProductItem key={product.id} unavailable={!product.available}>
            {editingProduct?.id === product.id ? (
              <div>
                <FormGroup>
                  <label>Nome:</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                </FormGroup>
                
                {/* Outros campos de edição... */}
                
                <div className="product-actions">
                  <Button onClick={handleSave}>Salvar</Button>
                  <Button variant="danger" onClick={() => setEditingProduct(null)}>Cancelar</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="product-header">
                  {product.image && <img src={product.image} alt={product.name} className="product-image" />}
                  <div>
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <p>Preço: R$ {product.price.toFixed(2)}</p>
                    <p>Categoria: {product.category}</p>
                    <p>Status: {product.available ? 'Disponível' : 'Indisponível'}</p>
                  </div>
                </div>
                <div className="product-actions">
                  <Button 
                    onClick={() => handleAvailabilityToggle(product)}
                    variant={product.available ? 'success' : 'danger'}
                  >
                    {product.available ? 'Desativar' : 'Ativar'}
                  </Button>
                  <Button onClick={() => handleEditClick(product)}>Editar</Button>
                  <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>Excluir</Button>
                </div>
              </>
            )}
          </ProductItem>
        ))}
      </div>
    </AdminPanelContainer>
  );
};

export default AdminPanel;