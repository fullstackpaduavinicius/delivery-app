// src/pages/Home.tsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';
import useProductStore from '../hooks/useProductStore';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;

const CategoryTitle = styled.h2`
  font-size: 20px;
  margin: 24px 0 16px;
  color: #333;
`;

const HomeContainer = styled.div`
  padding: 20px;
`;

const Home: React.FC = () => {
  const { products } = useProductStore();
  const { addToCart, cart } = useCart();

  // Debug: verifica os produtos carregados
  useEffect(() => {
    console.log('Produtos carregados:', products);
  }, [products]);

  const handleAddToCart = (product: Product) => {
    if (product.available) {
      addToCart({ ...product, quantity: 1 });
    }
  };

  const categories = Array.from(new Set(products.map(product => product.category)));
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <HomeContainer>
      <Header cartItemCount={cartItemCount} />
      <div className="container">
        {categories.length > 0 ? (
          categories.map(category => (
            <div key={category}>
              <CategoryTitle>{category}</CategoryTitle>
              <ProductsGrid>
                {products
                  .filter(product => product.category === category)
                  .map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
              </ProductsGrid>
            </div>
          ))
        ) : (
          <p>Nenhum produto disponível no momento.</p>
        )}
      </div>
    </HomeContainer>
  );
};

export default Home;