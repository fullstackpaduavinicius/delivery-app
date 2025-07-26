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

// Styled Components
const PageContainer = styled.div`
  padding: 0 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin: 24px 0;
`;

const CategoryContainer = styled.section`
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 16px;
  color: #333;
  padding-bottom: 8px;
  border-bottom: 2px solid #ea1d2c;
  font-weight: 600;
`;

// Modal para imagem em tela cheia
const FullscreenImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
`;

const FullscreenImage = styled.img`
  max-width: 95%;
  max-height: 95%;
  object-fit: contain;
  cursor: default;
`;

// Modal para detalhes do produto
const ProductModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ProductModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalImageContainer = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  cursor: zoom-in;
  overflow: hidden;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ModalInfo = styled.div`
  padding: 24px;
  overflow-y: auto;
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  margin: 0 0 12px;
  color: #333;
`;

const ModalDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 16px;
  line-height: 1.5;
`;

const ModalPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ea1d2c;
  margin-bottom: 24px;
`;

const ModalButton = styled.button`
  background: #ea1d2c;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 16px;

  &:hover {
    background: #d91826;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(234, 29, 44, 0.8);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  &:hover {
    background: rgba(217, 24, 38, 0.9);
  }
`;

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const mockProducts: Product[] = [
      // Lanches
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
      
      // Combos
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
        description: 'Pão brioche, 1 carne de 100g, cream cheese, camarão e uma coca-cola em lata.',
        price: 37.0,
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
      
      // Acompanhamentos
      {
        id: '8',
        name: 'Batata P (250g)',
        description: 'Porção pequena de batata frita crocante',
        price: 15.0,
        category: 'Acompanhamentos',
        image: batatas,
        available: true
      },
      {
        id: '9',
        name: 'Batata M (350g)',
        description: 'Porção média de batata frita crocante',
        price: 20.0,
        category: 'Acompanhamentos',
        image: batatas,
        available: true
      },
      {
        id: '10',
        name: 'Batata G (500g)',
        description: 'Porção grande de batata frita crocante',
        price: 30.0,
        category: 'Acompanhamentos',
        image: batatas,
        available: true
      },
      
      // Bebidas
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

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const openFullscreenImage = (image: string) => {
    setFullscreenImage(image);
  };

  const closeModals = () => {
    setSelectedProduct(null);
    setFullscreenImage(null);
  };

  const categories = Array.from(new Set(products.map(product => product.category)));
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categoryOrder = ['Lanches', 'Combos', 'Acompanhamentos', 'Bebidas'];
  const sortedCategories = categories.sort((a, b) => 
    categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  return (
    <div>
      <Header cartItemCount={cartItemCount} />
      <PageContainer>
        {sortedCategories.map(category => (
          <CategoryContainer key={category}>
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
                    onClick={() => handleProductClick(product)}
                  />
                ))}
            </ProductsGrid>
          </CategoryContainer>
        ))}
      </PageContainer>

      {/* Modal de imagem em tela cheia */}
      {fullscreenImage && (
        <FullscreenImageModal onClick={closeModals}>
          <FullscreenImage 
            src={fullscreenImage} 
            alt="Produto em tela cheia"
            onClick={(e) => e.stopPropagation()}
          />
          <CloseButton onClick={closeModals}>&times;</CloseButton>
        </FullscreenImageModal>
      )}

      {/* Modal de detalhes do produto */}
      {selectedProduct && (
        <ProductModalOverlay onClick={closeModals}>
          <ProductModalContent onClick={(e) => e.stopPropagation()}>
            <ModalImageContainer onClick={() => openFullscreenImage(selectedProduct.image)}>
              <ModalImage src={selectedProduct.image} alt={selectedProduct.name} />
            </ModalImageContainer>
            <ModalInfo>
              <ModalTitle>{selectedProduct.name}</ModalTitle>
              <ModalDescription>{selectedProduct.description}</ModalDescription>
              <ModalPrice>R$ {selectedProduct.price.toFixed(2)}</ModalPrice>
              <ModalButton 
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  closeModals();
                }}
                disabled={!selectedProduct.available}
              >
                {selectedProduct.available ? 'Adicionar ao Carrinho' : 'Indisponível'}
              </ModalButton>
            </ModalInfo>
            <CloseButton onClick={closeModals}>&times;</CloseButton>
          </ProductModalContent>
        </ProductModalOverlay>
      )}
    </div>
  );
};

export default Home;