import React from 'react';
import styled from 'styled-components';
import { Product } from '../types';

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 16px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #ea1d2c;
`;

const AddButton = styled.button`
  background-color: #ea1d2c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #d91826;
  }
`;

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card>
      <ProductImage src={product.image} alt={product.name} />
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductFooter>
          <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
          <AddButton onClick={() => onAddToCart(product)}>Adicionar</AddButton>
        </ProductFooter>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;