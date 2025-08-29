// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import { RiWhatsappFill, RiInstagramFill } from "react-icons/ri";



// Imagens...
import MaveSmashDuoImage from '../imgs/MAVESmashDuo.jpeg';
import MaveLoopImage from '../imgs/MAVELOOP.jpeg';
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

// ====================== Styled Components da página ======================
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

// Modais (imagem e produto)
const FullscreenImageModal = styled.div`
  position: fixed;
  inset: 0;
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

const ProductModalOverlay = styled.div`
  position: fixed;
  inset: 0;
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
  position: relative;
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

  &:hover {
    background: rgba(217, 24, 38, 0.9);
  }
`;

// ====================== Styled dos Botões Flutuantes ======================
// >>> z-index acima dos modais (1000) para aparecer sempre
const FloatWrap = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1100;
`;

const Fab = styled.a<{ bg: string }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 56px;
  height: 56px;
  padding: 0 16px;
  border-radius: 28px;
  background: ${({ bg }) => bg};
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.2s ease;
  will-change: transform;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0,0,0,0.22);
  }
`;

const FabIcon = styled.span`
  font-size: 20px;
  line-height: 0;
`;

const Balloon = styled.div<{ visible: boolean }>`
  position: absolute;
  right: 100%;
  margin-right: 10px;
  bottom: 50%;
  transform: translateY(50%);
  background: #111;
  color: #fff;
  font-size: 14px;
  padding: 10px 12px;
  border-radius: 10px;
  white-space: nowrap;
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.3s ease;
`;

const BalloonClose = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: #ea1d2c;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
`;

// ====================== Componente: FloatingSocials (ATUALIZADO) ======================
const FloatingSocials: React.FC = () => {
  // >>> CONFIGURE AQUI
  const WHATSAPP_NUMBER = '5579996718008'; // com DDI e DDD
  const WA_TEXT = encodeURIComponent('Olá! Vim pelo site e tenho uma dúvida 🙂');
  const INSTAGRAM_URL = 'https://www.instagram.com/maverick_lanche/';

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEXT}`;
  const igHref = INSTAGRAM_URL;

  // Mensagens rotativas
  const waMessages = ['Dúvidas? Chama no WhatsApp', 'Atendimento imediato 👇', 'Fale com a gente!'];
  const igMessages = ['Siga-nos no Instagram', 'Promoções e novidades ✨', 'Bastidores e combos!'];

  // Estados de exibição
  const [waBalloonIndex, setWaBalloonIndex] = useState(0);
  const [igBalloonIndex, setIgBalloonIndex] = useState(0);
  const [waVisible, setWaVisible] = useState(false);
  const [igVisible, setIgVisible] = useState(false);

  // Limite por sessão pra não virar incômodo
  const MAX_BURSTS = 6; // total de aparições alternadas
  const [bursts, setBursts] = useState<number>(() => {
    const v = sessionStorage.getItem('float_bursts');
    return v ? Number(v) : 0;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBursts((prev) => {
        const next = prev + 1;
        sessionStorage.setItem('float_bursts', String(next));
        return next;
      });

      // alterna exibição
      setWaVisible((_) => {
        const showWhats = bursts % 2 === 0;
        if (showWhats) setWaBalloonIndex((i) => (i + 1) % waMessages.length);
        return showWhats;
      });

      setIgVisible((_) => {
        const showInsta = bursts % 2 === 1;
        if (showInsta) setIgBalloonIndex((i) => (i + 1) % igMessages.length);
        return showInsta;
      });

      // auto-hide após 3s
      setTimeout(() => {
        setWaVisible(false);
        setIgVisible(false);
      }, 3000);

      if (bursts >= MAX_BURSTS) {
        clearInterval(interval);
        setWaVisible(false);
        setIgVisible(false);
      }
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bursts]);

  return (
    <FloatWrap aria-label="Ações rápidas de contato">
      {/* WhatsApp */}
      <div style={{ position: 'relative' }}>
        <Balloon visible={waVisible} role="status" aria-live="polite">
          {waMessages[waBalloonIndex]}
          <BalloonClose onClick={() => setWaVisible(false)} aria-label="Fechar">
            ×
          </BalloonClose>
        </Balloon>
        <Fab href={waHref} target="_blank" rel="noopener noreferrer" bg="#25D366" aria-label="Falar no WhatsApp">
          <RiWhatsappFill size={22} aria-hidden />
          WhatsApp
        </Fab>
      </div>

      {/* Instagram */}
      <div style={{ position: 'relative' }}>
        <Balloon visible={igVisible} role="status" aria-live="polite">
          {igMessages[igBalloonIndex]}
          <BalloonClose onClick={() => setIgVisible(false)} aria-label="Fechar">
            ×
          </BalloonClose>
        </Balloon>
        <Fab href={igHref} target="_blank" rel="noopener noreferrer" bg="#E1306C" aria-label="Abrir Instagram">
          <RiInstagramFill size={22} aria-hidden />
          Instagram
        </Fab>
      </div>
    </FloatWrap>
  );
};

// ====================== Componente Home ======================
const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const mockProducts: Product[] = [
      // ... (seus produtos exatamente como já estão)
      { id: 'lanche-mave-smash-duo', name: 'Mave Smash Duo', description: 'Pão brioche, 2 carnes smash fininhas e crocantes nas bordas, queijo muçarela derretido, alface e tomate.', price: 12.0, category: 'Lanches', image: MaveSmashDuoImage, available: true },
      { id: 'lanche-mave-loop', name: 'Mave Loop', description: 'Pão brioche, carne artesanal suculenta, queijo cheddar cremoso, coroado com três anéis de cebola crocantes.', price: 16.0, category: 'Lanches', image: MaveLoopImage, available: true },
      { id: 'lanche-x-recruta', name: 'X-Recruta', description: 'Pão brioche, 1 carne 100g, queijo cheddar e frango.', price: 23.0, category: 'Lanches', image: XRecrutaImage, available: true },
      { id: 'lanche-mave-frango', name: 'Mave Frango', description: 'Pão brioche, 1 carne 100g, queijo cheddar, frango, alface e tomate.', price: 25.0, category: 'Lanches', image: MaveFrangoImage, available: true },
      { id: 'lanche-mave-calabresa', name: 'Mave Calabresa', description: 'Pão brioche, 1 carne 100g, 2 camadas de cheddar, calabresa, ovo, alface e tomate.', price: 27.0, category: 'Lanches', image: MaveCalabresaImage, available: true },
      { id: 'lanche-maverick', name: 'Maverick', description: 'Pão brioche, 2 carnes 100g, 2 camadas de cheddar, bacon, ovo, alface e tomate.', price: 33.0, category: 'Lanches', image: MaverickImage, available: true },
      { id: 'combo-triplo-sargento', name: 'Triplo Sargento', description: '3 deliciosos hambúrgueres com pão brioche, carne artesanal 100g, frango, bacon e cheddar.', price: 49.0, category: 'Combos', image: TriploSargentoImage, available: true },
      { id: 'combo-major', name: 'Major', description: 'Pão brioche, 2 carnes 150g, 1 frango empanado, bacon, cheddar e batata frita com cheddar.', price: 40.0, category: 'Combos', image: MajorImage, available: true },
      { id: 'combo-capitao-do-mar', name: 'Capitão do Mar', description: 'Pão brioche, 1 carne 100g, cream cheese, camarão e uma Coca-Cola lata.', price: 37.0, category: 'Combos', image: CapitaoDoMarImage, available: true },
      { id: 'combo-rasante', name: 'Combo Rasante', description: '3 hambúrgueres gourmet (carne 100g, frango, bacon, cheddar), batata M e Guaraná Antarctica 1L.', price: 70.0, category: 'Combos', image: ComboRasanteImage, available: true },
      { id: 'acomp-batata-p', name: 'Batata P (250g)', description: 'Porção pequena de batata frita crocante.', price: 15.0, category: 'Acompanhamentos', image: batatas, available: true },
      { id: 'acomp-batata-m', name: 'Batata M (350g)', description: 'Porção média de batata frita crocante.', price: 20.0, category: 'Acompanhamentos', image: batatas, available: true },
      { id: 'acomp-batata-g', name: 'Batata G (500g)', description: 'Porção grande de batata frita crocante.', price: 30.0, category: 'Acompanhamentos', image: batatas, available: true },
      { id: 'bebida-coca-lata', name: 'Coca-Cola Lata', description: 'Refrigerante Coca-Cola lata 350ml.', price: 5.0, category: 'Bebidas', image: cocalata, available: true },
      { id: 'bebida-guarana-lata', name: 'Guaraná Antarctica Lata', description: 'Refrigerante Guaraná Antarctica lata 350ml.', price: 5.0, category: 'Bebidas', image: guaranalata, available: true },
      { id: 'bebida-coca-1l', name: 'Coca-Cola 1L', description: 'Refrigerante Coca-Cola 1L.', price: 8.0, category: 'Bebidas', image: cocalitro, available: true },
      { id: 'bebida-guarana-1l', name: 'Guaraná Antarctica 1L', description: 'Refrigerante Guaraná Antarctica 1L.', price: 8.0, category: 'Bebidas', image: guaranalitro, available: true },
    ];
    setProducts(mockProducts);
  }, []);

  const handleAddToCart = (product: Product) => {
    if (product.available) {
      addToCart({ ...product, quantity: 1 });
    }
  };

  const handleProductClick = (product: Product) => setSelectedProduct(product);
  const openFullscreenImage = (image: string) => setFullscreenImage(image);
  const closeModals = () => {
    setSelectedProduct(null);
    setFullscreenImage(null);
  };

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const categoryOrder = ['Lanches', 'Combos', 'Acompanhamentos', 'Bebidas'];
  const sortedCategories = categories.sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b));

  return (
    <div>
      <Header cartItemCount={cartItemCount} />
      <PageContainer>
        {sortedCategories.map((category) => (
          <CategoryContainer key={category}>
            <CategoryTitle>{category}</CategoryTitle>
            <ProductsGrid>
              {products
                .filter((product) => product.category === category)
                .sort((a, b) => a.price - b.price)
                .map((product) => (
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

      {fullscreenImage && (
        <FullscreenImageModal onClick={closeModals}>
          <FullscreenImage src={fullscreenImage} alt="Produto em tela cheia" onClick={(e) => e.stopPropagation()} />
          <CloseButton onClick={closeModals}>&times;</CloseButton>
        </FullscreenImageModal>
      )}

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

      {/* >>> Botões flutuantes de WhatsApp e Instagram */}
      <FloatingSocials />
    </div>
  );
};

export default Home;
