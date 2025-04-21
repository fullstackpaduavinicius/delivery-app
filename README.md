🍔 Food Delivery App – Seu sistema de pedidos online moderno
Um app completo de delivery de alimentos, inspirado no iFood, desenvolvido com React + TypeScript, focado em oferecer uma experiência moderna, intuitiva e responsiva para o usuário.

🔥 Principais Funcionalidades
✅ Catálogo organizado por categorias
Lanches, Pizzas, Bebidas… tudo separado pra facilitar a escolha.

✅ Carrinho inteligente
Adicione, remova e ajuste quantidades com facilidade.

✅ Checkout completo

Informações do cliente (nome, endereço, telefone)

Várias formas de pagamento: Cartão, PIX, Dinheiro

Opção para informar troco, se for pagar em espécie

✅ Integração com WhatsApp
O pedido é enviado automaticamente por mensagem. Prático e direto!

✅ Design responsivo (mobile-first)
Pensado para funcionar perfeitamente em qualquer dispositivo, com foco total na usabilidade.

🛠 Tecnologias Utilizadas

Frontend	Backend (simulado)	Ferramentas Extras
React 18	JSON (Mock)	TypeScript, Styled Components
React Router v6		Formik + Yup, Context API
React Icons		Webpack
🚀 Como rodar o projeto
✅ Pré-requisitos
Node.js v16 ou superior

npm ou yarn

📦 Instalação
bash
Copiar
Editar
git clone https://github.com/seu-usuario/food-delivery-app.git
cd food-delivery-app
npm install # ou yarn install
▶️ Iniciar o projeto
bash
Copiar
Editar
npm start # ou yarn start
Depois disso, acesse:
🌐 http://localhost:3000

📂 Estrutura de Pastas
bash
Copiar
Editar
src/
├── assets/             # Imagens e arquivos estáticos
├── components/         # Componentes reutilizáveis
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── ...
├── pages/              # Páginas principais
│   ├── Home.tsx
│   ├── Cart.tsx
│   └── Checkout.tsx
├── contexts/           # Contexto global (ex: Carrinho)
├── types/              # Tipagens com TypeScript
└── ...
⚙️ Personalização
✏️ Personalização rápida:
Produtos: edite o conteúdo em src/pages/Home.tsx

Imagens: adicione em src/assets/images/ e atualize as referências

WhatsApp: altere o número em src/pages/Checkout.tsx

📁 Variáveis de ambiente
Crie um arquivo .env na raiz com o seguinte conteúdo:

env
Copiar
Editar
REACT_APP_WHATSAPP_NUMBER=5511999999999
📸 Preview da Interface
Página Inicial

Carrinho

Checkout

(adicione prints se quiser deixar mais visual)

🤝 Quer contribuir?
Faça um fork do repositório

Crie sua branch:

bash
Copiar
Editar
git checkout -b minha-feature
Faça suas alterações e commit:

bash
Copiar
Editar
git commit -m 'feat: Minha nova feature'
Suba sua branch:

bash
Copiar
Editar
git push origin minha-feature
Abra um Pull Request e pronto! 🚀

