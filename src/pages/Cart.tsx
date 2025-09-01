// src/pages/Cart.tsx
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

/** ---------- Campo de Observações ---------- */
const ObservationContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

const ObsLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ObsTextarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  resize: vertical;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #ea1d2c;
    box-shadow: 0 0 0 3px rgba(234, 29, 44, 0.08);
  }
`;

const ObsHelper = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #666;
  text-align: right;
`;

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateCart } = useCart();

  /** bairros e fretes */
  const neighborhoods = [
    { name: 'Selecione seu bairro', deliveryFee: 0 },
    { name: 'Novo Paraíso', deliveryFee: 3.0 },
    { name: 'Bairro América', deliveryFee: 3.0 },
    { name: 'José Conrado de Araújo', deliveryFee: 3.0 },
    { name: 'Jardim Centenário', deliveryFee: 4.0 },
    { name: 'Santos Dumont', deliveryFee: 4.0 },
    { name: '18 do Forte', deliveryFee: 5.0 },
    { name: 'Siqueira Campos', deliveryFee: 3.0 },
    { name: 'Getúlio Vargas', deliveryFee: 4.0 },
    { name: 'Santo Antônio', deliveryFee: 6.0 },
    { name: 'Suíça', deliveryFee: 6.0 },
    { name: 'Palestina', deliveryFee: 6.0 },
    { name: 'Industrial', deliveryFee: 6.0 },
    { name: 'Cirurgia', deliveryFee: 4.0 },
    { name: 'São José', deliveryFee: 6.0 },
    { name: 'Jabotiana', deliveryFee: 7.0 },
    { name: 'Ponto Novo', deliveryFee: 5.0 },
    { name: 'Luzia', deliveryFee: 5.0 },
    { name: 'Jardins', deliveryFee: 7.0 },
    { name: 'Treze de Julho', deliveryFee: 7.0 },
    { name: 'Cidade Nova', deliveryFee: 6.0 },
    { name: 'Capucho', deliveryFee: 5.0 },
    { name: 'Olaria', deliveryFee: 4.0 },
    { name: 'Rosa Elze', deliveryFee: 4.0 },
    { name: 'Castelo Branco', deliveryFee: 4.0 },
  ];

  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Selecione seu bairro');
  const [orderNote, setOrderNote] = useState<string>(() => {
    return sessionStorage.getItem('order_note') || '';
  });
  const MAX_OBS_CHARS = 280;

  const handleIncreaseQuantity = (productId: string) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const handleDecreaseQuantity = (productId: string) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    updateCart(updatedCart);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getDeliveryFee = () => {
    if (!selectedNeighborhood) return 0;
    const neighborhood = neighborhoods.find((n) => n.name === selectedNeighborhood);
    return neighborhood ? neighborhood.deliveryFee : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + getDeliveryFee();
  };

  const handleObsChange = (value: string) => {
    const text = value.slice(0, MAX_OBS_CHARS);
    setOrderNote(text);
    sessionStorage.setItem('order_note', text);
  };

  const proceedToCheckout = () => {
    const fee = getDeliveryFee();

    if (!selectedNeighborhood || selectedNeighborhood === 'Selecione seu bairro') {
      alert('Por favor, selecione seu bairro para continuar');
      return;
    }

    // garante que tudo vai para a próxima página
    sessionStorage.setItem('order_note', orderNote);
    sessionStorage.setItem('delivery_neighborhood', selectedNeighborhood);
    sessionStorage.setItem('delivery_fee', String(fee));

    navigate('/checkout', {
      state: {
        orderNote,
        deliveryNeighborhood: selectedNeighborhood,
        deliveryFee: fee,
      },
    });
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
                        {neighborhood.name}{' '}
                        {neighborhood.deliveryFee > 0
                          ? `(Frete: R$ ${neighborhood.deliveryFee.toFixed(2)})`
                          : ''}
                      </option>
                    ))}
                  </Select>
                  <SelectIcon>
                    <FiChevronDown />
                  </SelectIcon>
                </SelectWrapper>
              </NeighborhoodSelector>

              {cart.map((item) => (
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

              {/* Observações do pedido */}
              <ObservationContainer>
                <ObsLabel htmlFor="order-note">Observações do pedido</ObsLabel>
                <ObsTextarea
                  id="order-note"
                  placeholder="Ex.: tirar cebola, ponto da carne, maionese à parte..."
                  value={orderNote}
                  onChange={(e) => handleObsChange(e.target.value)}
                  maxLength={MAX_OBS_CHARS}
                />
                <ObsHelper>
                  {orderNote.length}/{MAX_OBS_CHARS} caracteres
                </ObsHelper>
              </ObservationContainer>

              <Summary>
                <SummaryRow>
                  <span>Subtotal</span>
                  <span>R$ {calculateSubtotal().toFixed(2)}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Taxa de entrega</span>
                  <span>
                    {selectedNeighborhood && selectedNeighborhood !== 'Selecione seu bairro'
                      ? `R$ ${getDeliveryFee().toFixed(2)}`
                      : 'Selecione um bairro'}
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
