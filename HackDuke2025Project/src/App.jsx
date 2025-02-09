import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header.jsx";
import Discover from "./components/Discover.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Feed from "./components/Feed.jsx";
import CompanyProfile from "./components/CompanyProfile.jsx";
import Launch from './pages/Launch';
import { CategoryProvider } from './context/CategoryContext';

const App = () => {
  return (
    <CategoryProvider>
      <Router>
        <Header />
        <div className="p-4">
          <Routes>
            {/* Default route */}
            <Route path="/" element={<Discover />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/company/:companyName" element={<CompanyProfile />} />
            <Route path="/launch" element={<Launch />} />
          </Routes>
        </div>
      </Router>
    </CategoryProvider>
  );
};

export default App;
