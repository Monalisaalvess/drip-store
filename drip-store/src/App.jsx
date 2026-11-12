import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"

import { AuthProvider } from "./context/AuthContext.jsx"
import { CartProvider } from "./context/CartContext.jsx"


import HomePage           from "./pages/HomePage.jsx"
import ProductListingPage from "./pages/ProductListingPage.jsx"
import ProductViewPage    from "./pages/ProductViewPage.jsx"
import CartPage           from "./pages/CartPage.jsx"
import CheckoutPage       from "./pages/CheckoutPage.jsx"
import SuccessPage        from "./pages/SuccessPage.jsx"
import LoginPage          from "./pages/LoginPage.jsx"
import SignupPage         from "./pages/SignupPage.jsx"
import SignupFormPage     from "./pages/SignupFormPage.jsx"
import OrdersPage         from "./pages/OrdersPage.jsx"
import MyInfoPage         from "./pages/MyInfoPage.jsx"
import PaymentMethodsPage from "./pages/PaymentMethodsPage.jsx"
import ComingSoonPage     from "./pages/ComingSoonPage.jsx"
import NotFoundPage       from "./pages/NotFoundPage.jsx"


function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function RedirectToProducts() {
  const { search } = useLocation()
  return <Navigate to={`/produtos${search}`} replace />
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produtos" element={<ProductListingPage />} />
            <Route path="/products" element={<RedirectToProducts />} />
            <Route path="/product/:id" element={<ProductViewPage />} />

            <Route path="/carrinho" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/compra-realizada" element={<SuccessPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<SignupPage />} />
            <Route path="/cadastro/formulario" element={<SignupFormPage />} />
            <Route path="/meus-pedidos" element={<OrdersPage />} />
            <Route path="/minhas-informacoes" element={<MyInfoPage />} />
            <Route path="/metodos-pagamento" element={<PaymentMethodsPage />} />

            <Route path="/categorias" element={<ComingSoonPage title="Categorias" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
