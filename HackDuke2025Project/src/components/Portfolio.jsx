import { useState, useEffect } from 'react';
import './Portfolio.css';
import companyImage from '../assets/images/company-placeholder.png';
import { Line, Pie } from 'react-chartjs-2';
import portfolioData from '../data/portfolio.json';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import axios from 'axios'; // Import axios for API calls
import WalletDialog from './WalletDialog'; // Import the dialog component

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Portfolio = () => {
  const [timeRange, setTimeRange] = useState('1M'); // 1W, 1M, 3M, 1Y, ALL
  const [walletBalance, setWalletBalance] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const userId = 'USER_ID_HERE'; // Replace with actual user ID logic

  // First destructure the data
  const { portfolioStats, investments, timeSeriesData, industryAllocation } = portfolioData;

  // Then add console logs
  console.log('Portfolio Data:', portfolioData);
  console.log('Time Series Data:', timeSeriesData);
  console.log('Industry Allocation:', industryAllocation);

  // Fetch wallet balance
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get(`/api/useraccounts/${userId}/wallet`);
        setWalletBalance(response.data.walletBalance);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      }
    };

    fetchWalletBalance();
  }, [userId]);

  // Chart data
  const portfolioGrowthData = {
    labels: timeSeriesData.labels,
    datasets: [
      {
        label: 'Portfolio Value',
        data: timeSeriesData.portfolioValue,
        borderColor: '#00D1B2',
        tension: 0.4,
      }
    ]
  };

  const allocationData = {
    labels: Object.keys(industryAllocation),
    datasets: [
      {
        data: Object.values(industryAllocation),
        backgroundColor: [
          '#00D1B2',
          '#48C774',
          '#3298DC',
          '#F14668',
          '#FFD975'
        ],
      }
    ]
  };

  return (
    <div className="portfolio-container">
      {/* Overview Section */}
      <div className="portfolio-header">
        <h1>Investment Portfolio</h1>
        <div className="portfolio-summary">
          <div className="stat-card">
            <h3>Total Invested</h3>
            <p className="stat-value">${portfolioStats.totalInvested.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Current Value</h3>
            <p className="stat-value">${portfolioStats.totalValue.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Total Return</h3>
            <p className="stat-value positive">+{portfolioStats.totalReturn}%</p>
          </div>
          <div className="stat-card">
            <h3>Companies</h3>
            <p className="stat-value">{portfolioStats.numberOfCompanies}</p>
          </div>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="wallet-card">
        <div className="wallet-balance">
          <h3>Wallet Balance</h3>
          <p>${walletBalance.toLocaleString()}</p>
        </div>
        <button className="open-dialog-button" onClick={() => setDialogOpen(true)}>
          Open Wallet
        </button>
      </div>

      {/* Dialog for Wallet */}
      {dialogOpen && <WalletDialog onClose={() => setDialogOpen(false)} userId={userId} />}

      {/* Charts Section */}
      <div className="portfolio-charts">
        <div className="chart-container growth-chart">
          <div className="chart-header">
            <h2>Portfolio Growth</h2>
            <div className="time-range-buttons">
              {['1W', '1M', '3M', '1Y', 'ALL'].map(range => (
                <button
                  key={range}
                  className={`time-button ${timeRange === range ? 'active' : ''}`}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <Line data={portfolioGrowthData} options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            }
          }} />
        </div>
        
        <div className="chart-container allocation-chart">
          <h2>Portfolio Allocation</h2>
          <Pie data={allocationData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'right'
              }
            }
          }} />
        </div>
      </div>

      {/* Investments Table */}
      <div className="investments-section">
        <h2>Your Investments</h2>
        <div className="investments-table">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Invested Amount</th>
                <th>Current Value</th>
                <th>Return</th>
                <th>Industry</th>
                <th>Shares</th>
                <th>Date Invested</th>
              </tr>
            </thead>
            <tbody>
              {investments.map(investment => (
                <tr key={investment.id}>
                  <td>
                    <div className="company-cell">
                      <img src={companyImage} alt={investment.name} />
                      <span>{investment.name}</span>
                    </div>
                  </td>
                  <td>${investment.invested.toLocaleString()}</td>
                  <td>${investment.currentValue.toLocaleString()}</td>
                  <td className={investment.return >= 0 ? 'positive' : 'negative'}>
                    {investment.return >= 0 ? '+' : ''}{investment.return}%
                  </td>
                  <td>{investment.industry}</td>
                  <td>{investment.shares.toLocaleString()}</td>
                  <td>{new Date(investment.dateInvested).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;