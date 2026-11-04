# Digital Store (Drip Store)

Projeto final de Front-end (Digital College) feito em **React + Vite**, com CSS puro e React Router.

## Como rodar

```bash
npm install
npm run dev      # desenvolvimento -> http://localhost:5173
npm run build    # build de produção (pasta dist)
npm run preview  # testa o build
```

## Páginas e rotas

| Rota | Página |
| --- | --- |
| `/` | Home: galeria, coleções em destaque e produtos em alta |
| `/produtos` | Listagem: ordenar, filtrar e buscar produtos |
| `/products?filter=termo` | Rota da busca do header; redireciona para `/produtos?filter=termo` |
| `/product/:id` | Visualização do produto: galeria, BuyBox, opções e recomendados |
| `/carrinho` | Carrinho: quantidade, remover, frete por CEP, cupom e resumo |
| `/checkout` | Finalizar compra: dados pessoais, entrega e pagamento (com validação) |
| `/compra-realizada` | Confirmação do pedido |
| `/login` | Acesse sua conta |
| `/cadastro` e `/cadastro/formulario` | Criação de conta em duas etapas |
| `/meus-pedidos` | Lista de pedidos (área logada) |
| `/minhas-informacoes` | Dados da conta, com edição (área logada) |
| `/metodos-pagamento` | Cartões usados nas compras (área logada) |
| `/categorias` | Página provisória |
| `*` | Página 404 |

## Como testar o fluxo de compra

1. Abra um produto, escolha o **tamanho** e clique em **COMPRAR**.
2. No carrinho, teste o frete (qualquer CEP com 8 dígitos) e os cupons `DRIP10` (10%) e `NIKE15` (15%).
3. Em **Continuar**, preencha o checkout. Use um CPF válido (ex.: `529.982.247-25`) e qualquer número de cartão com 13+ dígitos.
4. Depois do pedido, crie uma conta em `/cadastro` ou entre em `/login` (qualquer e-mail e senha com 4+ caracteres) para ver **Meus Pedidos**.

> Não há servidor: carrinho, conta e pedidos ficam salvos no `localStorage` do navegador.

## Estrutura

```
src/
├── assets/            logos e ícones (SVG)
├── components/        Header, Footer, FooterInfo, Logo, Section, ProductCard,
│                      ProductListing, Gallery, FilterGroup, ProductOptions, BuyBox,
│                      MiniCart, FormField, AccountSidebar
├── context/           CartContext (carrinho) e AuthContext (conta e pedidos)
├── data/products.js   dados de exemplo dos produtos e dos filtros
├── utils/             máscaras/validações de formulário e useLocalStorage
├── pages/             Layout, HomePage, ProductListingPage, ProductViewPage, ...
├── App.jsx            rotas
├── index.css          cores (variáveis CSS) e estilos globais
└── main.jsx
public/                imagens (slides, coleções, produtos)
```

## Cores

primary `#C92071` · secondary `#B5B6F2` · tertiary `#991956` · error `#EE4266` · success `#52CA76` · warning `#F6AA1C`
dark-gray `#1F1F1F` · dark-gray-2 `#474747` · dark-gray-3 `#666666` · light-gray `#8F8F8F` · light-gray-2 `#CCCCCC` · light-gray-3 `#F5F5F5`

## Equipe

- Nome(s) dos integrantes aqui
