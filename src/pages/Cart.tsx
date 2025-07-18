import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiChevronDown } from 'react-icons/fi';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';

const CartContainer = styled.div`
  padding: 24px 0;
`;

const CartItemCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 16px;
`;

const ItemDetails = styled.div``;

const ItemName = styled.h3`
  font-size: 16px;
  margin-bottom: 4px;
`;

const ItemPrice = styled.p`
  font-size: 14px;
  color: #ea1d2c;
  font-weight: bold;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

const ControlButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
`;

const Quantity = styled.span`
  margin: 0 8px;
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ea1d2c;
  cursor: pointer;
`;

const Summary = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-top: 24px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const TotalRow = styled(SummaryRow)`
  font-weight: bold;
  font-size: 18px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
`;

const CheckoutButton = styled.button`
  width: 100%;
  margin-top: 16px;
`;

const NeighborhoodSelector = styled.div`
  margin-bottom: 24px;
`;

const SelectWrapper = styled.div`
  position: relative;
  margin-top: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  appearance: none;
  font-size: 16px;
`;

const SelectIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateCart } = useCart();
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');

  // Dados dos bairros e seus respectivos fretes
  const neighborhoods = [
    { name: 'Selecione seu bairro', deliveryFee: 0 },
    { name: 'Centro', deliveryFee: 5.00 },
    { name: 'Jardim das Flores', deliveryFee: 8.00 },
    { name: 'Vila Nova', deliveryFee: 7.50 },
    { name: 'Bela Vista', deliveryFee: 6.00 },
    { name: 'Alto da Colina', deliveryFee: 10.00 },
    { name: 'Zona Industrial', deliveryFee: 12.00 },
  ];

  const handleIncreaseQuantity = (productId: string) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const handleDecreaseQuantity = (productId: string) => {
    const updatedCart = cart
      .map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
      .filter(item => item.quantity > 0);
    updateCart(updatedCart);
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    updateCart(updatedCart);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getDeliveryFee = () => {
    if (!selectedNeighborhood) return 0;
    const neighborhood = neighborhoods.find(n => n.name === selectedNeighborhood);
    return neighborhood ? neighborhood.deliveryFee : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + getDeliveryFee();
  };

  const proceedToCheckout = () => {
    if (!selectedNeighborhood || selectedNeighborhood === 'Selecione seu bairro') {
      alert('Por favor, selecione seu bairro para continuar');
      return;
    }
    navigate('/checkout');
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <Header showBackButton cartItemCount={cartItemCount} />
      <div className="container">
        <CartContainer>
          <h2>Seu Carrinho</h2>
          
          {cart.length === 0 ? (
            <p>Seu carrinho está vazio</p>
          ) : (
            <>
              <NeighborhoodSelector>
                <label>Bairro de entrega</label>
                <SelectWrapper>
                  <Select
                    value={selectedNeighborhood}
                    onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  >
                    {neighborhoods.map((neighborhood) => (
                      <option key={neighborhood.name} value={neighborhood.name}>
                        {neighborhood.name} {neighborhood.deliveryFee > 0 ? `(Frete: R$ ${neighborhood.deliveryFee.toFixed(2)})` : ''}
                      </option>
                    ))}
                  </Select>
                  <SelectIcon>
                    <FiChevronDown />
                  </SelectIcon>
                </SelectWrapper>
              </NeighborhoodSelector>

              {cart.map(item => (
                <CartItemCard key={item.id}>
                  <ItemInfo>
                    <ItemImage src={item.image} alt={item.name} />
                    <ItemDetails>
                      <ItemName>{item.name}</ItemName>
                      <ItemPrice>R$ {(item.price * item.quantity).toFixed(2)}</ItemPrice>
                    </ItemDetails>
                  </ItemInfo>
                  <ItemControls>
                    <QuantityControl>
                      <ControlButton onClick={() => handleDecreaseQuantity(item.id)}>
                        <FiMinus size={14} />
                      </ControlButton>
                      <Quantity>{item.quantity}</Quantity>
                      <ControlButton onClick={() => handleIncreaseQuantity(item.id)}>
                        <FiPlus size={14} />
                      </ControlButton>
                    </QuantityControl>
                    <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                      <FiTrash2 size={18} />
                    </RemoveButton>
                  </ItemControls>
                </CartItemCard>
              ))}

              <Summary>
                <SummaryRow>
                  <span>Subtotal</span>
                  <span>R$ {calculateSubtotal().toFixed(2)}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Taxa de entrega</span>
                  <span>
                    {selectedNeighborhood && selectedNeighborhood !== 'Selecione seu bairro' ? 
                      `R$ ${getDeliveryFee().toFixed(2)}` : 
                      'Selecione um bairro'}
                  </span>
                </SummaryRow>
                <TotalRow>
                  <span>Total</span>
                  <span>R$ {calculateTotal().toFixed(2)}</span>
                </TotalRow>
                <CheckoutButton 
                  className="btn-primary" 
                  onClick={proceedToCheckout}
                  disabled={!selectedNeighborhood || selectedNeighborhood === 'Selecione seu bairro'}
                >
                  Finalizar Pedido
                </CheckoutButton>
              </Summary>
            </>
          )}
        </CartContainer>
      </div>
    </div>
  );
};

export default Cart;