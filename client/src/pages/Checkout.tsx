import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
  Box,
} from '@mui/material';

const Checkout: React.FC = () => {
  const { items, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [items]);

  const handleCheckout = () => {
    const orderMessage = `
🚚 *Novo Pedido*
${items
  .map(
    (item) =>
      `• ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`
  )
  .join('\n')}

📍 *Endereço:* ${address}
📝 *Observações:* ${note}

💰 *Total:* R$ ${total.toFixed(2)}
`;

    const whatsappURL = `https://wa.me/SEUNUMERO?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappURL, '_blank');
    clearCart();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Finalizar Pedido
      </Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={`${item.name} (${item.quantity}x)`}
              secondary={`R$ ${(item.price * item.quantity).toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Total: R$ {total.toFixed(2)}</Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Endereço de Entrega"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Observações"
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          sx={{ mt: 2 }}
          disabled={!address || items.length === 0}
        >
          Enviar pedido no WhatsApp
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;
