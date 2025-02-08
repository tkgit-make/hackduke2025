import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="flex justify-between">
        <div className="text-xl font-bold">YOLOFund</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-400">Discover</Link>
          </li>
          <li>
            <Link to="/portfolio" className="hover:text-gray-400">Portfolio</Link>
          </li>
          <li>
            <Link to="/feed" className="hover:text-gray-400">Feed</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
