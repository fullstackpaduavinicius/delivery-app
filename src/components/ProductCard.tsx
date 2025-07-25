import React from 'react';
import styled from 'styled-components';
import { Product } from '../types';

const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  background: white;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  height: 180px;
  overflow: hidden;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const InfoContainer = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-size: 18px;
  margin: 0 0 8px;
  color: #333;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #ea1d2c;
`;

const AddButton = styled.button`
  background: #ea1d2c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 14px;

  &:hover {
    background: #d91826;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const ViewMoreButton = styled.button`
  background: transparent;
  color: #ea1d2c;
  border: none;
  padding: 0;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  margin-bottom: 8px;
  display: inline-block;

  &:hover {
    text-decoration: underline;
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
  return (
    <CardContainer onClick={onClick}>
      <ImageContainer>
        <ProductImage src={product.image} alt={product.name} />
      </ImageContainer>
      <InfoContainer>
        <ProductName>{product.name}</ProductName>
        <ViewMoreButton onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}>
          Ver mais+
        </ViewMoreButton>
        <ProductDescription>{product.description}</ProductDescription>
        <PriceContainer>
          <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
          <AddButton 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={!product.available}
          >
            {product.available ? 'Adicionar' : 'Esgotado'}
          </AddButton>
        </PriceContainer>
        {!product.available && <OutOfStock>Indisponível</OutOfStock>}
      </InfoContainer>
    </CardContainer>
  );
};

export default ProductCard;