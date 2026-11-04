const thumb = (n) => `/product-thumb-${n}.jpeg`

const DESCRIPTION =
  "Descrição do produto. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

const PRODUCT_IMAGES = [1, 2, 3, 4, 5].map((n) => ({
  src: `/produc-image-${n}.jpeg`,
}))

const SIZES = ["39", "40", "41", "42", "43"]
const COLORS = ["#6FEEFF", "#FF6969", "#5E5E5E", "#6D70B7"]

function make(id, name, image, price, priceDiscount, extra) {
  return {
    id,
    name,
    image,
    price,
    priceDiscount,
    reference: `3841${6700 + id}`,
    stars: 4.7,
    rating: 90,
    description: DESCRIPTION,
    images: PRODUCT_IMAGES,
    sizes: SIZES,
    colors: COLORS,
    ...extra,
  }
}

// brand / category / gender / state alimentam os filtros da listagem
export const products = [
  make(1, "Air Jordan 1 Mid Masculino", thumb(1), 200, 149.9, { brand: "Nike", category: "Esporte e lazer", gender: "Masculino", state: "Novo" }),
  make(2, "Air Jordan 1 Chicago Masculino", thumb(2), 349.9, undefined, { brand: "Nike", category: "Casual", gender: "Masculino", state: "Novo" }),
  make(3, "Sapatênis Levi's Marrom Masculino", thumb(3), 259.9, 219.9, { brand: "Levi's", category: "Casual", gender: "Masculino", state: "Novo" }),
  make(4, "Tênis Karhu Synchron Unissex", thumb(4), 489.9, undefined, { brand: "Karhu", category: "Casual", gender: "Unissex", state: "Usado" }),
  make(5, "Tênis Nike SuperRep Go Masculino", thumb(5), 399.9, 299.9, { brand: "Nike", category: "Corrida", gender: "Masculino", state: "Novo" }),
  make(6, "Air Jordan 1 Mid Feminino", thumb(1), 229.9, 179.9, { brand: "Nike", category: "Esporte e lazer", gender: "Feminino", state: "Novo" }),
  make(7, "Air Jordan 1 Chicago Feminino", thumb(2), 329.9, undefined, { brand: "Nike", category: "Casual", gender: "Feminino", state: "Usado" }),
  make(8, "Sapatênis Levi's Marrom Unissex", thumb(3), 239.9, 199.9, { brand: "Levi's", category: "Casual", gender: "Unissex", state: "Novo" }),
  make(9, "Tênis Karhu Synchron Feminino", thumb(4), 459.9, 399.9, { brand: "Karhu", category: "Casual", gender: "Feminino", state: "Novo" }),
  make(10, "Tênis Nike SuperRep Go Feminino", thumb(5), 379.9, undefined, { brand: "Nike", category: "Corrida", gender: "Feminino", state: "Novo" }),
  make(11, "Air Jordan 1 Mid Unissex", thumb(1), 219.9, 169.9, { brand: "Nike", category: "Utilitário", gender: "Unissex", state: "Usado" }),
  make(12, "Tênis Karhu Synchron Masculino", thumb(4), 469.9, undefined, { brand: "Karhu", category: "Esporte e lazer", gender: "Masculino", state: "Novo" }),
]

export const getProductById = (id) => products.find((p) => String(p.id) === String(id))

// Opções dos filtros da página de listagem
export const filterGroups = [
  {
    key: "brand",
    title: "Marca",
    inputType: "checkbox",
    options: [
      { text: "Nike", value: "Nike" },
      { text: "Levi's", value: "Levi's" },
      { text: "Karhu", value: "Karhu" },
    ],
  },
  {
    key: "category",
    title: "Categoria",
    inputType: "checkbox",
    options: [
      { text: "Esporte e lazer", value: "Esporte e lazer" },
      { text: "Casual", value: "Casual" },
      { text: "Utilitário", value: "Utilitário" },
      { text: "Corrida", value: "Corrida" },
    ],
  },
  {
    key: "gender",
    title: "Gênero",
    inputType: "checkbox",
    options: [
      { text: "Masculino", value: "Masculino" },
      { text: "Feminino", value: "Feminino" },
      { text: "Unissex", value: "Unissex" },
    ],
  },
  {
    key: "state",
    title: "Estado",
    inputType: "radio",
    options: [
      { text: "Novo", value: "Novo" },
      { text: "Usado", value: "Usado" },
    ],
  },
]
