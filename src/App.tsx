import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout as LayoutIcon, LineChart, Wallet, ArrowRightLeft, PieChart, Settings, Menu, X, TrendingUp, Shield } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Analytics from './pages/Analytics';
import Transactions from './pages/Transactions';
import Security from './pages/Security';
import SettingsPage from './pages/Settings';
import ConnectWallet from './components/ConnectWallet';
import { useWallet } from './hooks/useWallet';

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: LayoutIcon, label: 'Dashboard', path: '/' },
    { icon: PieChart, label: 'Portfolio', path: '/portfolio' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
    { icon: ArrowRightLeft, label: 'Transactions', path: '/transactions' },
    { icon: Shield, label: 'Security', path: '/security' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? 'w-64' : 'w-20'
      } bg-gray-800 shadow-xl transition-all duration-300 flex flex-col border-r border-gray-700 h-screen fixed`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        <h1 className={`font-bold text-xl text-blue-400 ${!isSidebarOpen && 'hidden'}`}>
          CrossFi AI
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav className="flex-1 pt-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`w-full p-4 flex items-center gap-3 transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            {isSidebarOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { isConnected, address, disconnect } = useWallet();

  return (
    <div className="min-h-screen bg-gray-900 flex text-gray-100">
      <Sidebar />
      <div className="flex-1 pl-20 lg:pl-64">
        <div className="p-8">
          <div className="flex justify-end mb-8">
            {isConnected ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-400">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button
                  onClick={disconnect}
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 transform hover:scale-105"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
              >
                <Wallet size={20} />
                Connect Wallet
              </button>
            )}
          </div>
          {children}
        </div>
      </div>
      {isWalletModalOpen && <ConnectWallet onClose={() => setIsWalletModalOpen(false)} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/security" element={<Security />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;