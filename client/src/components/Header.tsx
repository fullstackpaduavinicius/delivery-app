import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #ea1d2c;
  color: white;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 70px; /* Altura fixa para o header */
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  height: 100%;
`;

const LogoImage = styled.img`
  height: 100%;
  width: auto;
  padding: 10px 0;
  object-fit: contain;
`;

const LogoText = styled.h1`
  font-size: 24px;
  margin: 0;
  font-weight: bold;
`;

const CartButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

const CartBadge = styled.span`
  position: absolute;
  top: 12px;
  right: -8px;
  background-color: white;
  color: #ea1d2c;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
`;

interface HeaderProps {
  showBackButton?: boolean;
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ showBackButton = false, cartItemCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderContent>
        {showBackButton ? (
          <BackButton onClick={() => navigate(-1)}>
            <FiArrowLeft size={24} />
          </BackButton>
        ) : (
          <LogoContainer onClick={() => navigate('/')}>
            <LogoImage src="/logo.png" alt="Maverick Lanches" />
            <LogoText>Maverick Lanches</LogoText>
          </LogoContainer>
        )}
        <CartButton onClick={() => navigate('/cart')}>
          <FiShoppingCart size={24} />
          {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
        </CartButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;