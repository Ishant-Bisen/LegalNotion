import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppConnect from "./components/WhatsAppConnect";
import DocumentSeo from "./components/DocumentSeo";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Reviews from "./pages/Reviews";
import Careers from "./pages/Careers";
import { PATHS } from "./routes/paths";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path={PATHS.legalServices} element={<Services />} />
        <Route path={PATHS.aboutUs} element={<About />} />
        <Route path={PATHS.legalBlog} element={<Blogs />} />
        <Route path={PATHS.clientReviews} element={<Reviews />} />
        <Route path={PATHS.careers} element={<Careers />} />
        {/* Legacy + keyword aliases → canonical (SPA); hosting should mirror with 301 in _redirects */}
        <Route path="/services" element={<Navigate to={PATHS.legalServices} replace />} />
        <Route path="/about" element={<Navigate to={PATHS.aboutUs} replace />} />
        <Route path="/blogs" element={<Navigate to={PATHS.legalBlog} replace />} />
        <Route path="/reviews" element={<Navigate to={PATHS.clientReviews} replace />} />
        <Route path="/legal-service" element={<Navigate to={PATHS.legalServices} replace />} />
        <Route path="/company-registration" element={<Navigate to={PATHS.legalServices} replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <DocumentSeo />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <WhatsAppConnect />
      </div>
    </BrowserRouter>
  );
}

export default App;
