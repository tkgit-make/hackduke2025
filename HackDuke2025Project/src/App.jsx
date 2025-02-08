
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import Header from './components/Header.jsx';
import Discover from './components/Discover.jsx';
import Portfolio from './components/Portfolio.jsx';
import Feed from './components/Feed.jsx';


const App = () => {
  return (
    <Router>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
