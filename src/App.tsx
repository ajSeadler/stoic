import "./styles/App.css";
import AppHeroLayout from "./components/layout/AppHeroLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Maint from "./pages/Maint";
import AppLayout from "./components/layout/AppLayout";
import PortfolioPage from "./pages/PortfolioPage";
import AboutMePage from "./pages/AboutMePage";
import BooksSection from "./components/sections/BooksSection";

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<AppHeroLayout />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/comingsoon" element={<Maint />} />
          <Route path="/books" element={<BooksSection />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
