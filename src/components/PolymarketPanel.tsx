import React, { useState, useEffect } from 'react';
import { LineChart, TrendingUp, DollarSign, Loader } from 'lucide-react';
import { PolymarketService, Market } from '../services/polymarket';

const PolymarketPanel = () => {
  const [selectedMarket, setSelectedMarket] = useState('');
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(false);
  const [positionSize, setPositionSize] = useState('');
  const [targetProb, setTargetProb] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [status, setStatus] = useState('');

  const polymarketService = PolymarketService.getInstance();

  useEffect(() => {
    loadMarkets();
  }, []);

  const loadMarkets = async () => {
    setLoading(true);
    try {
      const marketData = await polymarketService.getMarkets();
      setMarkets(marketData);
    } catch (error) {
      console.error('Failed to load markets:', error);
    }
    setLoading(false);
  };

  const placeBet = async () => {
    if (!selectedMarket || !positionSize) return;

    setLoading(true);
    try {
      const tx = await polymarketService.placeBet(
        selectedMarket,
        true,
        Number(positionSize)
      );
      setStatus(`Bet placed successfully! TX: ${tx.slice(0, 10)}...`);
    } catch (error) {
      setStatus('Failed to place bet');
    }
    setLoading(false);
  };

  return (
    <div className="text-white">
      <div className="flex items-center mb-6">
        <LineChart className="w-8 h-8 mr-3 text-blue-500" />
        <h2 className="text-2xl font-bold">Polymarket Automation</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Active Markets
          </h3>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="space-y-4">
              {markets.map((market) => (
                <div
                  key={market.id}
                  className={`p-4 rounded-lg cursor-pointer ${
                    selectedMarket === market.id
                      ? 'bg-blue-600'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setSelectedMarket(market.id)}
                >
                  <h4 className="font-medium mb-2">{market.title}</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">
                      Probability: {market.probability}
                    </span>
                    <span className="text-gray-300">
                      Volume: {market.volume}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    Ends: {new Date(market.endDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Trading Configuration
          </h3>
          {selectedMarket ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Position Size (USDC)
                </label>
                <input
                  type="number"
                  value={positionSize}
                  onChange={(e) => setPositionSize(e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Probability
                </label>
                <input
                  type="number"
                  value={targetProb}
                  onChange={(e) => setTargetProb(e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white"
                  placeholder="75"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stop Loss (%)
                </label>
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white"
                  placeholder="10"
                />
              </div>
              <button
                onClick={placeBet}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
              >
                {loading ? (
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  'Start Automated Trading'
                )}
              </button>
              {status && (
                <p className="text-sm text-gray-300 mt-2">{status}</p>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              Select a market to configure trading parameters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolymarketPanel;