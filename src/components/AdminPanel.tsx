import React, { useState } from 'react';
import { Product } from '../types';
import '../styles/adminPanel.css';

interface AdminPanelProps {
  products: Product[];
  onUpdateProduct: (updatedProduct: Product) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (productId: string) => void; // Nova prop para deletar
}

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
    setEditingProduct(product);
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
      newProduct.image &&
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
      alert('Preencha todos os campos corretamente!');
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      onDeleteProduct(productId);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Painel do Restaurante</h2>

      <div className="add-form">
        <h3>Adicionar novo produto</h3>
        <input
          type="text"
          placeholder="Nome"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <textarea
          placeholder="Descrição"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Imagem (URL)"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        >
          <option value="">Selecione uma categoria</option>
          <option value="Lanches">Lanches</option>
          <option value="Pizzas">Pizzas</option>
          <option value="Bebidas">Bebidas</option>
        </select>
        <input
          type="number"
          placeholder="Preço"
          min="0"
          step="0.01"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
        />
        <label>
          <input
            type="checkbox"
            checked={newProduct.available}
            onChange={(e) => setNewProduct({ ...newProduct, available: e.target.checked })}
          />
          Disponível
        </label>
        <button onClick={handleAddProduct}>Adicionar Produto</button>
      </div>

      <div className="product-list">
        <h3>Lista de Produtos ({products.length})</h3>
        {products.map(product => (
          <div key={product.id} className={`product-item ${!product.available ? 'unavailable' : ''}`}>
            {editingProduct?.id === product.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                />
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                />
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                >
                  <option value="Lanches">Lanches</option>
                  <option value="Pizzas">Pizzas</option>
                  <option value="Bebidas">Bebidas</option>
                </select>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })
                  }
                />
                <div className="edit-actions">
                  <button onClick={handleSave}>Salvar</button>
                  <button onClick={() => setEditingProduct(null)}>Cancelar</button>
                </div>
              </div>
            ) : (
              <>
                <div className="info">
                  <img src={product.image} alt={product.name} className="thumbnail" />
                  <div>
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <div className="details">
                      <span>Preço: R$ {product.price.toFixed(2)}</span>
                      <span>Categoria: {product.category}</span>
                      <span>Status: {product.available ? 'Disponível' : 'Indisponível'}</span>
                    </div>
                  </div>
                </div>
                <div className="actions">
                  <button 
                    onClick={() => handleAvailabilityToggle(product)}
                    className={product.available ? 'btn-unavailable' : 'btn-available'}
                  >
                    {product.available ? 'Desativar' : 'Ativar'}
                  </button>
                  <button 
                    onClick={() => handleEditClick(product)}
                    className="btn-edit"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="btn-delete"
                  >
                    Excluir
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;