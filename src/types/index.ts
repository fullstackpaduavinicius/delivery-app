export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean; // Novo campo para controle de estoque

}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  customer: {
    name: string;
    address: string;
    complement: string;
    phone: string;
  };
  payment: {
    method: 'credit' | 'debit' | 'pix' | 'cash';
    cardBrand?: string;
    changeFor?: number;
  };
  items: CartItem[];
  total: number;
}

import React from 'react';

export interface PaymentMethod {
  id: 'credit' | 'debit' | 'pix' | 'cash';
  label: string;
  icon: React.ReactNode; // atualizado para aceitar qualquer tipo de conteúdo React
}
