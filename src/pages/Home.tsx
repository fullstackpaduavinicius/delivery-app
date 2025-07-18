import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';

// Importações de imagens
import classicoImage from '../imgs/classico.jpeg';
import CheeseburgerImage from '../imgs/Cheeseburger.jpeg';
import XsaladaImage from '../imgs/Xsalada.jpeg';
import XbaconImage from '../imgs/Xbacon.jpeg';
import XtudoImage from '../imgs/Xtudo.jpeg';
import XfrangoImage from '../imgs/Xfrango.jpeg';
import Pizzamargherita from '../imgs/Pizzamargherita.jpeg';
import Pizzacalabresa from '../imgs/Pizzacalabresa.jpeg';
import Pizzaportuguesa from '../imgs/Pizzaportuguesa.jpeg';
import Pizzaquatroqueijos from '../imgs/Pizzaquatroqueijos.jpeg';
import Pizzafrangocomcatupiry from '../imgs/Pizzafrangocomcatupiry.jpeg';
import Pizzapepperoni from '../imgs/Pizzapepperoni.jpeg';
import Refrigerante from '../imgs/Refrigerante.jpeg';
import Suconatural from '../imgs/Suconatural.jpeg';
import Aguamineral from '../imgs/Aguamineral.jpeg';
import Cerveja from '../imgs/Cerveja.jpeg';
import Energetico from '../imgs/Energetico.jpeg';
import Aguadecoco from '../imgs/Aguadecoco.jpeg';

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
        name: 'Hambúrguer Clássico',
        description: 'Pão, hambúrguer, queijo, alface e tomate',
        price: 22.9,
        category: 'Lanches',
        image: classicoImage,
        available: true
      },
      {
        id: '2',
        name: 'Cheeseburger',
        description: 'Pão, hambúrguer, queijo cheddar, bacon',
        price: 25.9,
        category: 'Lanches',
        image: CheeseburgerImage,
        available: true
      },
      {
        id: '3',
        name: 'X-Salada',
        description: 'Pão, hambúrguer, queijo, alface, tomate e maionese',
        price: 20.9,
        category: 'Lanches',
        image: XsaladaImage,
        available: true
      },
      {
        id: '4',
        name: 'X-Bacon',
        description: 'Pão, hambúrguer, queijo, bacon e maionese',
        price: 27.9,
        category: 'Lanches',
        image: XbaconImage,
        available: true
      },
      {
        id: '5',
        name: 'X-Tudo',
        description: 'Pão, 2 hambúrgueres, queijo, bacon, ovo, alface e tomate',
        price: 32.9,
        category: 'Lanches',
        image: XtudoImage,
        available: true
      },
      {
        id: '6',
        name: 'X-Frango',
        description: 'Pão, filé de frango, queijo, alface e tomate',
        price: 24.9,
        category: 'Lanches',
        image: XfrangoImage,
        available: true
      },
      // Pizzas
      {
        id: '7',
        name: 'Pizza Margherita',
        description: 'Molho de tomate, mussarela e manjericão',
        price: 45.9,
        category: 'Pizzas',
        image: Pizzamargherita,
        available: true
      },
      {
        id: '8',
        name: 'Pizza Calabresa',
        description: 'Molho de tomate, mussarela e calabresa',
        price: 48.9,
        category: 'Pizzas',
        image: Pizzacalabresa,
        available: true
      },
      {
        id: '9',
        name: 'Pizza Portuguesa',
        description: 'Molho de tomate, mussarela, presunto, ovo, cebola e azeitona',
        price: 52.9,
        category: 'Pizzas',
        image: Pizzaportuguesa,
        available: true
      },
      {
        id: '10',
        name: 'Pizza Quatro Queijos',
        description: 'Molho de tomate, mussarela, provolone, parmesão e gorgonzola',
        price: 55.9,
        category: 'Pizzas',
        image: Pizzaquatroqueijos,
        available: true
      },
      {
        id: '11',
        name: 'Pizza Frango com Catupiry',
        description: 'Molho de tomate, frango desfiado e catupiry',
        price: 50.9,
        category: 'Pizzas',
        image: Pizzafrangocomcatupiry,
        available: true
      },
      {
        id: '12',
        name: 'Pizza Pepperoni',
        description: 'Molho de tomate, mussarela e pepperoni',
        price: 49.9,
        category: 'Pizzas',
        image: Pizzapepperoni,
        available: true
      },
      // Bebidas
      {
        id: '13',
        name: 'Refrigerante',
        description: 'Lata 350ml',
        price: 5.9,
        category: 'Bebidas',
        image: Refrigerante,
        available: true
      },
      {
        id: '14',
        name: 'Suco Natural',
        description: 'Copo 300ml - sabores: laranja, abacaxi ou maracujá',
        price: 7.9,
        category: 'Bebidas',
        image: Suconatural,
        available: true
      },
      {
        id: '15',
        name: 'Água Mineral',
        description: 'Garrafa 500ml',
        price: 3.9,
        category: 'Bebidas',
        image: Aguamineral,
        available: true
      },
      {
        id: '16',
        name: 'Cerveja',
        description: 'Long neck 355ml',
        price: 8.9,
        category: 'Bebidas',
        image: Cerveja,
        available: true
      },
      {
        id: '17',
        name: 'Energético',
        description: 'Lata 250ml',
        price: 10.9,
        category: 'Bebidas',
        image: Energetico,
        available: true
      },
      {
        id: '18',
        name: 'Água de Coco',
        description: 'Garrafa 300ml',
        price: 6.9,
        category: 'Bebidas',
        image: Aguadecoco,
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