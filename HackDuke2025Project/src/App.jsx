import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header.jsx";
import Discover from "./components/Discover.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Feed from "./components/Feed.jsx";
import CompanyProfile from "./components/CompanyProfile.jsx";
import Launch from './pages/Launch';
import { CategoryProvider } from './context/CategoryContext';
import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import { ErrorBoundary } from 'react-error-boundary';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (replace with actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CategoryProvider>
      <Router>
        {isLoading && <LoadingScreen />}
        <Header />
        <div className="p-4">
          <main className="min-h-screen">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Routes>
                {/* Default route */}
                <Route path="/" element={<Discover />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/company/:companyName" element={<CompanyProfile />} />
                <Route path="/launch" element={<Launch />} />
              </Routes>
            </ErrorBoundary>
          </main>
        </div>
      </Router>
    </CategoryProvider>
  );
};

function ErrorFallback({ error }) {
  return (
    <div role="alert" className="error-alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export default App;
