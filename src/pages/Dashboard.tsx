import React, { useState } from 'react';
import { LineChart, TrendingUp, TrendingDown, Activity, ArrowRight, Info } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import TransactionModal from '../components/TransactionModal';

const portfolioData = {
  totalValue: 125432.89,
  chains: {
    ethereum: 45000,
    polygon: 35000,
    avalanche: 25000,
    arbitrum: 20432.89,
  },
  performance: {
    daily: 2.5,
    weekly: 8.7,
    monthly: 15.2,
  },
};

const mockYieldData = [
  { protocol: 'Aave', apy: '4.2%', tvl: '$2.5M', chain: 'Ethereum', risk: 'Low' },
  { protocol: 'Curve', apy: '8.5%', tvl: '$1.8M', chain: 'Polygon', risk: 'Medium' },
  { protocol: 'Trader Joe', apy: '12.3%', tvl: '$900K', chain: 'Avalanche', risk: 'High' },
];

function Dashboard() {
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState<any>(null);
  const { isConnected } = useWallet();

  const handleInvest = (protocol: any) => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    setSelectedProtocol(protocol);
    setShowInvestModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Info size={16} />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(portfolioData.performance).map(([period, value]) => (
          <div key={period} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-gray-400 capitalize mb-2">{period} Return</h3>
            <div className="flex items-center gap-2">
              {value > 0 ? <TrendingUp className="text-green-400" size={20} /> : <TrendingDown className="text-red-400" size={20} />}
              <p className={`text-2xl font-bold ${value > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {value > 0 ? '+' : ''}{value}%
              </p>
            </div>
          </div>
        ))}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-gray-400 mb-2">Total Value</h3>
          <p className="text-2xl font-bold text-white">
            ${portfolioData.totalValue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chain Distribution */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Chain Distribution</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-all duration-200">
              Last 24h
            </button>
            <button className="px-4 py-2 text-sm bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-all duration-200">
              Last Week
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {Object.entries(portfolioData.chains).map(([chain, value]) => (
            <button
              key={chain}
              onClick={() => setSelectedChain(chain)}
              className={`px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                selectedChain === chain
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-lg font-medium">{chain.charAt(0).toUpperCase() + chain.slice(1)}</span>
                <span className="text-sm opacity-75">${value.toLocaleString()}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Yield Opportunities */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Top Yield Opportunities</h2>
          <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200">
            View All <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockYieldData.map((opportunity) => (
            <div
              key={opportunity.protocol}
              className="bg-gray-700/50 p-6 rounded-xl border border-gray-600/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{opportunity.protocol}</h3>
                  <p className="text-sm text-gray-400">{opportunity.chain}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  opportunity.risk === 'Low' ? 'bg-green-400/20 text-green-400' :
                  opportunity.risk === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
                  'bg-red-400/20 text-red-400'
                }`}>
                  {opportunity.risk} Risk
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">APY</span>
                  <span className="text-green-400 font-medium">{opportunity.apy}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">TVL</span>
                  <span className="text-white">{opportunity.tvl}</span>
                </div>
              </div>
              <button
                onClick={() => handleInvest(opportunity)}
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Invest Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {showInvestModal && (
        <TransactionModal
          type="deposit"
          onClose={() => setShowInvestModal(false)}
          onSubmit={(data) => {
            console.log('Investment:', { protocol: selectedProtocol, ...data });
            setShowInvestModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;