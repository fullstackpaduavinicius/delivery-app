import React from 'react';
import styled from 'styled-components';
import { Product } from '../types';

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  cursor: zoom-in;
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

const AddButton = styled.button<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#ea1d2c')};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#d91826')};
  }
`;

const OutOfStock = styled.div`
  font-size: 12px;
  color: red;
  margin-top: 8px;
`;

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick }) => {
  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <Card onClick={onClick}>
      <ProductImage src={product.image} alt={product.name} onClick={(e) => {
        e.stopPropagation();
        onClick();
      }} />
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductFooter>
          <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
          <AddButton
            onClick={handleAddClick}
            disabled={!product.available}
          >
            {product.available ? 'Adicionar' : 'Esgotado'}
          </AddButton>
        </ProductFooter>
        {!product.available && <OutOfStock>Indisponível</OutOfStock>}
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;