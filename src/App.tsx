import "./App.css";
import AppHeroLayout from "./AppHeroLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Maint from "./Maint";
import AppLayout from "./AppLayout";
import PortfolioPage from "./pages/PortfolioPage";
import AboutMePage from "./pages/AboutMePage";

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<AppHeroLayout />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/comingsoon" element={<Maint />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
