import React, { useState } from 'react';
import { Wallet, Bot, LineChart, Image } from 'lucide-react';
import SafeWallet from './components/SafeWallet';
import TradingBot from './components/TradingBot';
import PolymarketPanel from './components/PolymarketPanel';
import MemeGenerator from './components/MemeGenerator';

function App() {
  const [activeTab, setActiveTab] = useState('wallet');

  const tabs = [
    { id: 'wallet', name: 'Safe Wallet', icon: Wallet },
    { id: 'trading', name: 'Trading Bot', icon: Bot },
    { id: 'polymarket', name: 'Polymarket', icon: LineChart },
    { id: 'memes', name: 'Meme Generator', icon: Image },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'wallet':
        return <SafeWallet />;
      case 'trading':
        return <TradingBot />;
      case 'polymarket':
        return <PolymarketPanel />;
      case 'memes':
        return <MemeGenerator />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-white text-xl font-bold">CrossFi AI</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;