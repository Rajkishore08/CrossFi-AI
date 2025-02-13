import React, { useState, useEffect } from 'react';
import { Bot, Settings, Play, Pause, Loader } from 'lucide-react';
import { CowService } from '../services/cow';

const TradingBot = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [strategy, setStrategy] = useState('momentum');
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    totalTrades: 0,
    successRate: 0,
    profitLoss: 0,
    gasSaved: 0,
  });

  const cowService = CowService.getInstance();

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(updateMetrics, 5000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const updateMetrics = async () => {
    const newMetrics = await cowService.getPerformanceMetrics();
    setMetrics(newMetrics);
  };

  const toggleBot = async () => {
    setLoading(true);
    try {
      if (!isRunning) {
        await cowService.executeTrade('eth-usdc', 1, 'buy');
      }
      setIsRunning(!isRunning);
    } catch (error) {
      console.error('Failed to toggle bot:', error);
    }
    setLoading(false);
  };

  return (
    <div className="text-white">
      <div className="flex items-center mb-6">
        <Bot className="w-8 h-8 mr-3 text-blue-500" />
        <h2 className="text-2xl font-bold">CoW Protocol Trading Bot</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Bot Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Trading Strategy
              </label>
              <select
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white"
              >
                <option value="momentum">Momentum Trading</option>
                <option value="grid">Grid Trading</option>
                <option value="arbitrage">Arbitrage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Trading Pair
              </label>
              <select className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white">
                <option value="eth-usdc">ETH/USDC</option>
                <option value="wbtc-usdc">WBTC/USDC</option>
                <option value="link-usdc">LINK/USDC</option>
              </select>
            </div>
            <button
              onClick={toggleBot}
              disabled={loading}
              className={`w-full ${
                isRunning
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              } text-white px-4 py-2 rounded-lg flex items-center justify-center`}
            >
              {loading ? (
                <Loader className="w-5 h-5 mr-2 animate-spin" />
              ) : isRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Stop Bot
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Bot
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Total Trades</span>
              <span className="text-blue-400">{metrics.totalTrades}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Success Rate</span>
              <span className="text-green-400">
                {metrics.successRate.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Profit/Loss</span>
              <span className="text-green-400">
                +{metrics.profitLoss.toFixed(2)} ETH
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Gas Saved</span>
              <span className="text-blue-400">
                {metrics.gasSaved.toFixed(3)} ETH
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingBot;