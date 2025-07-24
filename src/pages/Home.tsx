import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';

// Importações de imagens
import MaverickImage from '../imgs/Maverick.jpeg';
import ComboRasanteImage from '../imgs/Combo_Rasante.jpeg';
import TriploSargentoImage from '../imgs/Triplo_Sargento.jpeg';
import XRecrutaImage from '../imgs/x-Recruta.jpeg';
import MajorImage from '../imgs/Major.jpeg';
import MaveCalabresaImage from '../imgs/Mave_Calabresa.jpeg';
import MaveFrangoImage from '../imgs/Mave_Frango.jpeg';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;

const CategoryTitle = styled.h2`
  font-size: 20px;
  margin: 24px 0 16px;
  color: #333;
`;

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const mockProducts: Product[] = [
      // Lanches
      {
        id: '1',
        name: 'Maverick',
        description: 'Pão brioche, 2 carnes com 100 g, 2 camadas de queijo cheddar, bacon, ovo, alface e tomate',
        price: 33.0,
        category: 'Lanches',
        image: MaverickImage,
        available: true
      },
      {
        id: '2',
        name: 'X-Recruta',
        description: 'Pão brioche, 1 carne com 100 g, queijo cheddar, frango',
        price: 23.0,
        category: 'Lanches',
        image: XRecrutaImage,
        available: true
      },
      {
        id: '3',
        name: 'Mave Calabresa',
        description: 'Pão brioche, 1 carne com 100 g, 2 camadas de queijo cheddar, calabresa, ovo, alface e tomate',
        price: 27.0,
        category: 'Lanches',
        image: MaveCalabresaImage,
        available: true
      },
      {
        id: '4',
        name: 'Mave Frango',
        description: 'Pão brioche, 1 carne com 100 g, queijo cheddar, frango, alface e tomate',
        price: 25.0,
        category: 'Lanches',
        image: MaveFrangoImage,
        available: true
      },
      // Combos
      {
        id: '5',
        name: 'Combo Rasante',
        description: '3 deliciosos hambúrgueres gourmet com carne de 100g, frango, bacon, queijo cheddar, batata Mav M e uma Guaraná Antarctica de 1L',
        price: 70.0,
        category: 'Combos',
        image: ComboRasanteImage,
        available: true
      },
      {
        id: '6',
        name: 'Triplo Sargento',
        description: '3 deliciosos hamburgueres com pão brioche, carne artesanal com 100g, frango, bacon e queijo cheddar',
        price: 49.0,
        category: 'Combos',
        image: TriploSargentoImage,
        available: true
      },
      {
        id: '7',
        name: 'Major',
        description: 'Pão brioche, 2 carnes com 150g, 1 frango empanado, bacon, queijo cheddar e batata frita com cheddar',
        price: 40.0,
        category: 'Combos',
        image: MajorImage,
        available: true
      },
      // Batatas
      {
        id: '8',
        name: 'Batata Mav M',
        description: 'Porção média de batata frita crocante',
        price: 12.0,
        category: 'Batatas',
        image: '', // Adicione a imagem correspondente
        available: true
      },
      {
        id: '9',
        name: 'Batata com Cheddar',
        description: 'Porção de batata frita com cheddar derretido',
        price: 15.0,
        category: 'Batatas',
        image: '', // Adicione a imagem correspondente
        available: true
      },
      // Bebidas
      {
        id: '10',
        name: 'Guaraná Antarctica 1L',
        description: 'Refrigerante Guaraná Antarctica 1 litro',
        price: 8.0,
        category: 'Bebidas',
        image: '', // Adicione a imagem correspondente
        available: true
      },
      {
        id: '11',
        name: 'Coca-Cola 600ml',
        description: 'Refrigerante Coca-Cola 600ml',
        price: 7.0,
        category: 'Bebidas',
        image: '', // Adicione a imagem correspondente
        available: true
      },
      {
        id: '12',
        name: 'Suco Natural 300ml',
        description: 'Suco natural de laranja, abacaxi ou maracujá',
        price: 6.0,
        category: 'Bebidas',
        image: '', // Adicione a imagem correspondente
        available: true
      }
    ];
    setProducts(mockProducts);
  }, []);

  const handleAddToCart = (product: Product) => {
    if (product.available) {
      addToCart({ ...product, quantity: 1 });
    }
  };

  const categories = Array.from(new Set(products.map(product => product.category)));
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <Header cartItemCount={cartItemCount} />
      <div className="container">
        {categories.map(category => (
          <div key={category}>
            <CategoryTitle>{category}</CategoryTitle>
            <ProductsGrid>
              {products
                .filter(product => product.category === category)
                .map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
            </ProductsGrid>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;