import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #ea1d2c;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const LogoImage = styled.img`
  height: 50px;
  margin-right: 10px;
`;

const AppTitle = styled.h1`
  color: white;
  font-size: 18px;
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
  z-index: 2;
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
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
  font-size: 24px;
  cursor: pointer;
  z-index: 2;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface HeaderProps {
  showBackButton?: boolean;
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ showBackButton = false, cartItemCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer onClick={() => navigate('/')}>
      <HeaderContent>
        <LeftContainer>
          {showBackButton ? (
            <BackButton onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}>
              <FiArrowLeft size={24} />
            </BackButton>
          ) : (
            <AppTitle>Cardápio Maverick</AppTitle>
          )}
        </LeftContainer>

        <LogoContainer>
          <LogoImage src="/logo.png" alt="Maverick Burger Logo" />
        </LogoContainer>

        <CartButton onClick={(e) => {
          e.stopPropagation();
          navigate('/cart');
        }}>
          <FiShoppingCart size={24} />
          {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
        </CartButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;