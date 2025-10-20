// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProductPage from "./pages/ProductPage";
import CollectionsPage from "./pages/CollectionsPage";
import MenPage from "./pages/MenPage";
import WomenPage from "./pages/WomenPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Homepage uses ProductPage */}
        <Route index element={<ProductPage />} />

        {/* Other pages as placeholders */}
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="men" element={<MenPage />} />
        <Route path="women" element={<WomenPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<h2 className="p-6">404 - Page Not Found</h2>} />
      </Route>
    </Routes>
  );
}

export default App;
