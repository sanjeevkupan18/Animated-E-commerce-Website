import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import ParticleBackground from "./components/ParticleBackground";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Story from "./pages/Story";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

function AppRoutes() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/story" element={<Story />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CartProvider>
          <ParticleBackground />
          <Cursor />
          <Navbar />
          <ScrollToTop />
          <AppRoutes />
          <Chatbot />
        </CartProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
