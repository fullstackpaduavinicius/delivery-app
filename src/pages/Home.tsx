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
import cocalata from '../imgs/coca-lata.jpeg';
import cocalitro from '../imgs/coca-litro.jpeg';
import guaranalata from '../imgs/guarana-lata.jpeg';
import guaranalitro from '../imgs/guarana-litro.jpeg';
import CapitaoDoMarImage from '../imgs/CAPITAO_DO_MAR.jpeg';
import batatas from '../imgs/batatas.jpeg';

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
      // Lanches (ordered by price ascending)
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
        id: '4',
        name: 'Mave Frango',
        description: 'Pão brioche, 1 carne com 100 g, queijo cheddar, frango, alface e tomate',
        price: 25.0,
        category: 'Lanches',
        image: MaveFrangoImage,
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
        id: '1',
        name: 'Maverick',
        description: 'Pão brioche, 2 carnes com 100 g, 2 camadas de queijo cheddar, bacon, ovo, alface e tomate',
        price: 33.0,
        category: 'Lanches',
        image: MaverickImage,
        available: true
      },
      
      // Combos (ordered by price ascending)
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
      {
        id: '13',
        name: 'Capitão do Mar',
        description: 'Combo especial com peixe empanado, batata frita e refrigerante',
        price: 55.0,
        category: 'Combos',
        image: CapitaoDoMarImage,
        available: true
      },
      {
        id: '5',
        name: 'Combo Rasante',
        description: '3 deliciosos hambúrgueres gourmet com carne de 100g, frango, bacon, queijo cheddar, batata M e uma Guaraná Antarctica de 1L',
        price: 70.0,
        category: 'Combos',
        image: ComboRasanteImage,
        available: true
      },
      
      // Batatas (ordered by price ascending)
      {
        id: '8',
        name: 'Batata P (250g)',
        description: 'Porção pequena de batata frita crocante',
        price: 15.0,
        category: 'Batatas',
        image: batatas,
        available: true
      },
      {
        id: '9',
        name: 'Batata M (350g)',
        description: 'Porção média de batata frita crocante',
        price: 20.0,
        category: 'Batatas',
        image: batatas,
        available: true
      },
      {
        id: '10',
        name: 'Batata G (500g)',
        description: 'Porção grande de batata frita crocante',
        price: 30.0,
        category: 'Batatas',
        image: batatas,
        available: true
      },
      
      
      // Bebidas (ordered by price ascending)
      
      {
        id: '15',
        name: 'Coca-Cola Lata',
        description: 'Refrigerante Coca-Cola em lata 350ml',
        price: 5.0,
        category: 'Bebidas',
        image: cocalata,
        available: true
      },
      {
        id: '16',
        name: 'Guaraná Antarctica Lata',
        description: 'Refrigerante Guaraná Antarctica em lata 350ml',
        price: 5.0,
        category: 'Bebidas',
        image: guaranalata,
        available: true
      },
      {
        id: '17',
        name: 'Coca-Cola 1L',
        description: 'Refrigerante Coca-Cola 1L',
        price: 7.0,
        category: 'Bebidas',
        image: cocalitro,
        available: true
      },
      {
        id: '18',
        name: 'Guaraná Antarctica 1L',
        description: 'Refrigerante Guaraná Antarctica 1 litro',
        price: 8.0,
        category: 'Bebidas',
        image: guaranalitro,
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
                .sort((a, b) => a.price - b.price)
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