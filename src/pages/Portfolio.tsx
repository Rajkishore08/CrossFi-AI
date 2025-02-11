import React, { useState } from 'react';
import { PieChart, ArrowUp, ArrowDown } from 'lucide-react';
import TransactionModal from '../components/TransactionModal';
import { useWallet } from '../hooks/useWallet';

const portfolioAssets = [
  { name: 'ETH', value: 45000, change: 2.5, chain: 'Ethereum' },
  { name: 'MATIC', value: 35000, change: -1.2, chain: 'Polygon' },
  { name: 'AVAX', value: 25000, change: 5.7, chain: 'Avalanche' },
  { name: 'ARB', value: 20432.89, change: 3.2, chain: 'Arbitrum' },
];

const positions = [
  { protocol: 'Aave', asset: 'ETH', value: 15000, apy: 4.2 },
  { protocol: 'Curve', asset: 'USDC', value: 25000, apy: 8.5 },
  { protocol: 'Trader Joe', asset: 'AVAX', value: 10000, apy: 12.3 },
];

function Portfolio() {
  const { isConnected } = useWallet();
  const [modalType, setModalType] = useState<'deposit' | 'withdraw' | null>(null);

  const handleTransaction = (data: any) => {
    console.log('Transaction:', { type: modalType, ...data });
    // Implement transaction logic here
  };

  const handleAction = (type: 'deposit' | 'withdraw') => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    setModalType(type);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-8">Portfolio</h1>

      {/* Asset Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-6">Asset Distribution</h2>
          <div className="space-y-4">
            {portfolioAssets.map((asset) => (
              <div key={asset.name} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200">
                <div>
                  <h3 className="font-medium text-white">{asset.name}</h3>
                  <p className="text-sm text-gray-400">{asset.chain}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">${asset.value.toLocaleString()}</p>
                  <p className={`text-sm flex items-center gap-1 ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {asset.change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    {Math.abs(asset.change)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-6">Active Positions</h2>
          <div className="space-y-4">
            {positions.map((position) => (
              <div key={position.protocol} className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-white">{position.protocol}</h3>
                  <span className="text-green-400">{position.apy}% APY</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{position.asset}</span>
                  <span className="text-white">${position.value.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => handleAction('deposit')}
          className="p-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 text-white font-medium transform hover:scale-105"
        >
          Deposit Assets
        </button>
        <button
          onClick={() => handleAction('withdraw')}
          className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200 text-white font-medium transform hover:scale-105"
        >
          Withdraw Assets
        </button>
        <button
          onClick={() => alert('Rewards claimed successfully!')}
          className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200 text-white font-medium transform hover:scale-105"
        >
          Claim Rewards
        </button>
      </div>

      {modalType && (
        <TransactionModal
          type={modalType}
          onClose={() => setModalType(null)}
          onSubmit={handleTransaction}
        />
      )}
    </div>
  );
}

export default Portfolio;