import React from 'react';

// Tipos básicos
export type PaymentMethodType = 'credit' | 'debit' | 'pix' | 'cash';
export type CategoryType = 'Lanches' | 'Pizzas' | 'Bebidas' | string;

// Interface principal de Produto
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  image: string;
  available: boolean;
}

// Item do Carrinho (extende Product)
export interface CartItem extends Product {
  quantity: number;
}

// Dados do Cliente
export interface CustomerInfo {
  name: string;
  address: string;
  complement: string;
  phone: string;
  email?: string;
  neighborhood?: string;
}

// Informações de Pagamento
export interface PaymentInfo {
  method: PaymentMethodType;
  cardBrand?: string;
  changeFor?: number;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

// Pedido Completo
export interface Order {
  id?: string;
  customer: CustomerInfo;
  payment: PaymentInfo;
  items: CartItem[];
  total: number;
  status?: 'pending' | 'preparing' | 'delivered' | 'canceled';
  createdAt?: Date;
}

// Método de Pagamento para UI
export interface PaymentMethod {
  id: PaymentMethodType;
  label: string;
  icon: React.ReactNode;
  description?: string;
}

// Contexto do Carrinho
export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartItemCount: number;
  cartTotal: number;
  submitOrder: (order: Omit<Order, 'items' | 'total'>) => Promise<Order>;
}

// Props para componentes comuns
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  isAdmin?: boolean;
}

// Tipos para formulários
export interface AddressFormData {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}