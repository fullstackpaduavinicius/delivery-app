import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { FaCreditCard, FaMoneyBillWave, FaQrcode, FaCopy } from 'react-icons/fa';
import { RiBankCard2Line } from 'react-icons/ri';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../types';

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  margin-top: 24px;
`;

const FormTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 501;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const ErrorText = styled.div`
  color: #ea1d2c;
  font-size: 14px;
  margin-top: 4px;
`;

const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin: 16px 0;
`;

const PaymentMethodCard = styled.div<{ selected: boolean }>`
  border: 1px solid ${props => (props.selected ? '#ea1d2c' : '#ddd')};
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  background-color: ${props => (props.selected ? '#fff5f5' : 'white')};

  &:hover {
    border-color: #ea1d2c;
  }
`;

const PaymentIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
  color: #ea1d2c;
`;

const PaymentLabel = styled.span`
  font-size: 14px;
  text-align: center;
`;

const CardBrandsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;
`;

const CardBrandOption = styled.div<{ selected: boolean }>`
  border: 1px solid ${props => (props.selected ? '#ea1d2c' : '#ddd')};
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: ${props => (props.selected ? '#fff5f5' : 'white')};

  &:hover {
    border-color: #ea1d2c;
  }
`;

const PixContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PixCode = styled.div`
  font-family: monospace;
  font-size: 16px;
  margin: 12px 0;
  padding: 8px 12px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #ea1d2c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c41722;
  }
`;

const ChangeForInput = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  span {
    margin-right: 8px;
  }
`;

type PaymentMethod = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const typedCart = cart as CartItem[];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [selectedCardBrand, setSelectedCardBrand] = useState<string | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    { id: 'credit', label: 'Crédito', icon: <FaCreditCard /> },
    { id: 'debit', label: 'Débito', icon: <RiBankCard2Line /> },
    { id: 'pix', label: 'PIX', icon: <FaQrcode /> },
    { id: 'cash', label: 'Dinheiro', icon: <FaMoneyBillWave /> },
  ];

  const cardBrands = [
    { id: 'visa', name: 'Visa' },
    { id: 'mastercard', name: 'Mastercard' },
    { id: 'elo', name: 'Elo' },
    { id: 'amex', name: 'American Express' },
    { id: 'hipercard', name: 'Hipercard' },
  ];

  const DELIVERY_FEE = 5;
  const PIX_KEY = '60.654.740/0001-73';

  const calculateTotal = () => {
    return typedCart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0) + DELIVERY_FEE;
  };

  const copyPixToClipboard = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleSubmit = (values: any) => {
    const total = calculateTotal();
    const changeFor = selectedPaymentMethod === 'cash' ? parseFloat(values.changeFor) : 0;
    const changeAmount = changeFor - total;

    const order = {
      customer: {
        name: values.name,
        address: values.address,
        complement: values.complement,
        phone: values.phone,
      },
      payment: {
        method: selectedPaymentMethod as 'credit' | 'debit' | 'pix' | 'cash',
        cardBrand:
          selectedPaymentMethod === 'credit' || selectedPaymentMethod === 'debit'
            ? selectedCardBrand
            : undefined,
        changeFor: selectedPaymentMethod === 'cash' ? changeFor : undefined,
        changeAmount: selectedPaymentMethod === 'cash' ? changeAmount : undefined,
      },
      items: typedCart,
      total: total,
    };

    sendOrderToWhatsApp(order);
    navigate('/');
  };

  const sendOrderToWhatsApp = (order: any) => {
    const phoneNumber = '557996718008';
    const message = formatOrderMessage(order);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatOrderMessage = (order: any) => {
    let message = `*NOVO PEDIDO* 🚀\n\n`;
    message += `*Cliente:* ${order.customer.name}\n`;
    message += `*Endereço:* ${order.customer.address}\n`;
    message += `*Complemento:* ${order.customer.complement}\n`;
    message += `*Telefone:* ${order.customer.phone}\n\n`;
    message += `*Itens:*\n`;

    order.items.forEach((item: CartItem) => {
      message += `- ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Taxa de entrega:* R$ ${DELIVERY_FEE.toFixed(2)}\n`;
    message += `*Total:* R$ ${order.total.toFixed(2)}\n\n`;
    message += `*Pagamento:* ${getPaymentMethodLabel(order.payment.method)}\n`;

    if (order.payment.method === 'credit' || order.payment.method === 'debit') {
      message += `*Bandeira:* ${order.payment.cardBrand}\n`;
    } else if (order.payment.method === 'cash') {
      message += `*Valor recebido:* R$ ${order.payment.changeFor?.toFixed(2) || '0.00'}\n`;
      message += `*Troco:* R$ ${order.payment.changeAmount?.toFixed(2) || '0.00'}\n`;
    } else if (order.payment.method === 'pix') {
      message += `\n*Chave PIX:* ${PIX_KEY}\n`;
      message += `Por favor, envie o comprovante de pagamento para confirmarmos seu pedido.\n`;
    }

    message += `\nObrigado pelo pedido! 🎉`;
    return message;
  };

  const getPaymentMethodLabel = (method: string) => {
    const pm = paymentMethods.find(pm => pm.id === method);
    return pm ? pm.label : method;
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    address: Yup.string().required('Endereço é obrigatório'),
    phone: Yup.string().required('Telefone é obrigatório'),
    changeFor: Yup.number().when('paymentMethod', {
      is: 'cash',
      then: (schema) =>
        schema
          .required('Informe o valor para troco')
          .min(calculateTotal(), `O valor deve ser pelo menos R$ ${calculateTotal().toFixed(2)}`),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const cartItemCount = typedCart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  return (
    <div>
      <Header showBackButton cartItemCount={cartItemCount} />
      <div className="container">
        <FormContainer>
          <FormTitle>Finalizar Pedido</FormTitle>

          <Formik
            initialValues={{
              name: '',
              address: '',
              complement: '',
              phone: '',
              changeFor: '',
              paymentMethod: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <FormGroup>
                  <Label htmlFor="name">Nome</Label>
                  <Input type="text" id="name" name="name" />
                  <ErrorMessage name="name" component={ErrorText} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="address">Endereço</Label>
                  <Input type="text" id="address" name="address" />
                  <ErrorMessage name="address" component={ErrorText} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    type="text"
                    id="complement"
                    name="complement"
                    placeholder="Apto, bloco, referência..."
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input type="text" id="phone" name="phone" placeholder="(11) 99999-9999" />
                  <ErrorMessage name="phone" component={ErrorText} />
                </FormGroup>

                <FormGroup>
                  <Label>Forma de pagamento</Label>
                  <PaymentMethods>
                    {paymentMethods.map((method) => (
                      <PaymentMethodCard
                        key={method.id}
                        selected={selectedPaymentMethod === method.id}
                        onClick={() => {
                          setSelectedPaymentMethod(method.id);
                          setFieldValue('paymentMethod', method.id);
                        }}
                      >
                        <PaymentIcon>{method.icon}</PaymentIcon>
                        <PaymentLabel>{method.label}</PaymentLabel>
                      </PaymentMethodCard>
                    ))}
                  </PaymentMethods>
                </FormGroup>

                {(selectedPaymentMethod === 'credit' || selectedPaymentMethod === 'debit') && (
                  <FormGroup>
                    <Label>Bandeira do cartão</Label>
                    <CardBrandsContainer>
                      {cardBrands.map((brand) => (
                        <CardBrandOption
                          key={brand.id}
                          selected={selectedCardBrand === brand.id}
                          onClick={() => setSelectedCardBrand(brand.id)}
                        >
                          {brand.name}
                        </CardBrandOption>
                      ))}
                    </CardBrandsContainer>
                  </FormGroup>
                )}

                {selectedPaymentMethod === 'pix' && (
                  <PixContainer>
                    <p>Chave PIX Copia e Cola:</p>
                    <PixCode>{PIX_KEY}</PixCode>
                    <CopyButton onClick={copyPixToClipboard}>
                      <FaCopy />
                      {copiedPix ? 'Copiado!' : 'Copiar PIX'}
                    </CopyButton>
                    <p style={{ marginTop: '8px', fontSize: '14px' }}>
                      Envie o comprovante para confirmarmos seu pedido.
                    </p>
                  </PixContainer>
                )}

                {selectedPaymentMethod === 'cash' && (
                  <>
                    <FormGroup>
                      <Label>Troco para quanto?</Label>
                      <ChangeForInput>
                        <span>R$</span>
                        <Input type="number" name="changeFor" min={calculateTotal()} step="0.01" />
                      </ChangeForInput>
                      <ErrorMessage name="changeFor" component={ErrorText} />
                    </FormGroup>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                      Valor total: R$ {calculateTotal().toFixed(2)}
                    </p>
                  </>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={
                    !selectedPaymentMethod ||
                    ((selectedPaymentMethod === 'credit' || selectedPaymentMethod === 'debit') &&
                      !selectedCardBrand)
                  }
                >
                  Fazer Pedido
                </button>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </div>
    </div>
  );
};

export default Checkout;