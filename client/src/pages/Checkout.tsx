import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { FaCreditCard, FaMoneyBillWave, FaQrcode } from 'react-icons/fa';
import { RiBankCard2Line } from 'react-icons/ri';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';

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
  font-weight: 500;
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
  border: 1px solid ${props => props.selected ? '#ea1d2c' : '#ddd'};
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  background-color: ${props => props.selected ? '#fff5f5' : 'white'};

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

const CardBrands = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
  margin: 16px 0;
`;

const CardBrand = styled.div<{ selected: boolean }>`
  border: 1px solid ${props => props.selected ? '#ea1d2c' : '#ddd'};
  border-radius: 4px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  background-color: ${props => props.selected ? '#fff5f5' : 'white'};

  &:hover {
    border-color: #ea1d2c;
  }

  img {
    max-width: 100%;
    height: auto;
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
  const { cart } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [selectedCardBrand, setSelectedCardBrand] = useState<string | null>(null);

  const paymentMethods: PaymentMethod[] = [
    { id: 'credit', label: 'Crédito', icon: <FaCreditCard /> },
    { id: 'debit', label: 'Débito', icon: <RiBankCard2Line /> },
    { id: 'pix', label: 'PIX', icon: <FaQrcode /> },
    { id: 'cash', label: 'Dinheiro', icon: <FaMoneyBillWave /> },
  ];

  const cardBrands = [
    { id: 'visa', name: 'Visa', image: 'https://via.placeholder.com/40x25?text=VISA' },
    { id: 'mastercard', name: 'Mastercard', image: 'https://via.placeholder.com/40x25?text=MC' },
    { id: 'elo', name: 'Elo', image: 'https://via.placeholder.com/40x25?text=ELO' },
    { id: 'amex', name: 'Amex', image: 'https://via.placeholder.com/40x25?text=AMEX' },
    { id: 'hipercard', name: 'Hipercard', image: 'https://via.placeholder.com/40x25?text=HC' },
  ];

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0) + 5;
  };

  const handleSubmit = (values: any) => {
    const order = {
      customer: {
        name: values.name,
        address: values.address,
        complement: values.complement,
        phone: values.phone,
      },
      payment: {
        method: selectedPaymentMethod as 'credit' | 'debit' | 'pix' | 'cash',
        cardBrand: selectedPaymentMethod === 'credit' || selectedPaymentMethod === 'debit' ? selectedCardBrand : undefined,
        changeFor: selectedPaymentMethod === 'cash' ? parseFloat(values.changeFor) : undefined,
      },
      items: cart,
      total: calculateTotal(),
    };

    sendOrderToWhatsApp(order);
  };

  const sendOrderToWhatsApp = (order: any) => {
    const phoneNumber = '5579998807035';
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

    order.items.forEach((item: any) => {
      message += `- ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Taxa de entrega:* R$ 5.00\n`;
    message += `*Total:* R$ ${order.total.toFixed(2)}\n\n`;
    message += `*Pagamento:* ${getPaymentMethodLabel(order.payment.method)}\n`;

    if (order.payment.method === 'credit' || order.payment.method === 'debit') {
      message += `*Bandeira:* ${order.payment.cardBrand}\n`;
    } else if (order.payment.method === 'cash') {
      message += `*Troco para:* R$ ${order.payment.changeFor?.toFixed(2) || '0.00'}\n`;
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
    changeFor: Yup.number()
      .when('paymentMethod', {
        is: 'cash',
        then: (schema) =>
          schema
            .required('Informe o valor para troco')
            .min(calculateTotal(), `O valor deve ser pelo menos R$ ${calculateTotal().toFixed(2)}`),
      }),
  });

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
                  <Input type="text" id="complement" name="complement" placeholder="Apto, bloco, referência..." />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input type="text" id="phone" name="phone" placeholder="(11) 99999-9999" />
                  <ErrorMessage name="phone" component={ErrorText} />
                </FormGroup>

                <FormGroup>
                  <Label>Forma de pagamento</Label>
                  <PaymentMethods>
                    {paymentMethods.map(method => (
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
                    <CardBrands>
                      {cardBrands.map(brand => (
                        <CardBrand
                          key={brand.id}
                          selected={selectedCardBrand === brand.id}
                          onClick={() => setSelectedCardBrand(brand.id)}
                        >
                          <img src={brand.image} alt={brand.name} />
                        </CardBrand>
                      ))}
                    </CardBrands>
                  </FormGroup>
                )}

                {selectedPaymentMethod === 'cash' && (
                  <FormGroup>
                    <Label>Troco para quanto?</Label>
                    <ChangeForInput>
                      <span>R$</span>
                      <Input
                        type="number"
                        name="changeFor"
                        min={calculateTotal()}
                        step="0.01"
                      />
                    </ChangeForInput>
                    <ErrorMessage name="changeFor" component={ErrorText} />
                  </FormGroup>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={
                    !selectedPaymentMethod ||
                    ((selectedPaymentMethod === 'credit' || selectedPaymentMethod === 'debit') && !selectedCardBrand)
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
