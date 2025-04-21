import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #ea1d2c;
  color: white;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 24px;
  cursor: pointer;
`;

const CartButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  position: relative;
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

interface HeaderProps {
  showBackButton?: boolean;
  cartItemCount?: number;
}

// Componente auxiliar para os ícones
const IconWrapper: React.FC<{ icon: React.ReactNode }> = ({ icon }) => <>{icon}</>;

const Header: React.FC<HeaderProps> = ({ showBackButton = false, cartItemCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
          {showBackButton ? (
            <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white' }}>
              <IconWrapper icon={<FiArrowLeft size={24} />} />
            </button>
          ) : (
            <Logo onClick={() => navigate('/')}>DeliveryApp</Logo>
          )}
          <CartButton onClick={() => navigate('/cart')}>
            <IconWrapper icon={<FiShoppingCart size={24} />} />
            {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
          </CartButton>
        </HeaderContent>
      </div>
    </HeaderContainer>
  );
};

export default Header;