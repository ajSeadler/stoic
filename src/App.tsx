import "./App.css";
import AppHeroLayout from "./AppHeroLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Maint from "./Maint";
import AppLayout from "./AppLayout";

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<AppHeroLayout />} />
          <Route path="/comingsoon" element={<Maint />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
