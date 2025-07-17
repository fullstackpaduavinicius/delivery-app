import React from 'react';
import styled from 'styled-components';
import { Product } from '../types';

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 1px solid #f0f0f0;
`;

const ProductInfo = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-size: 16px;
  margin: 0 0 8px 0;
  color: #333;
  font-weight: 600;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  flex-grow: 1;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ProductPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #ea1d2c;
`;

const AddButton = styled.button<{ $available: boolean }>`
  background-color: ${({ $available }) => ($available ? '#ea1d2c' : '#cccccc')};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${({ $available }) => ($available ? 'pointer' : 'not-allowed')};
  transition: all 0.3s ease;
  min-width: 100px;

  &:hover {
    background-color: ${({ $available }) => ($available ? '#d91826' : '#cccccc')};
  }
`;

const AvailabilityBadge = styled.span<{ $available: boolean }>`
  font-size: 12px;
  color: ${({ $available }) => ($available ? '#28a745' : '#dc3545')};
  margin-top: 8px;
  font-weight: 500;
`;

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart,
  className 
}) => {
  const handleAddToCart = () => {
    if (product.available) {
      onAddToCart(product);
    }
  };

  return (
    <Card className={className}>
      <ProductImage 
        src={product.image || '/placeholder-product.jpg'} 
        alt={product.name}
      />
      
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        
        <ProductFooter>
          <ProductPrice>
            R$ {product.price.toFixed(2).replace('.', ',')}
          </ProductPrice>
          <AddButton
            onClick={handleAddToCart}
            $available={product.available}
            aria-label={product.available ? 'Adicionar ao carrinho' : 'Produto esgotado'}
          >
            {product.available ? 'Adicionar' : 'Esgotado'}
          </AddButton>
        </ProductFooter>
        
        <AvailabilityBadge $available={product.available}>
          {product.available ? 'Disponível' : 'Indisponível'}
        </AvailabilityBadge>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;