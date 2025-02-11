import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const performanceData = {
  daily: { value: 2.5, volume: '1.2M' },
  weekly: { value: 8.7, volume: '5.8M' },
  monthly: { value: 15.2, volume: '22.4M' },
  yearly: { value: 124.5, volume: '156.7M' },
};

const topPerformers = [
  { asset: 'ETH', change: 12.5, volume: '2.3M' },
  { asset: 'MATIC', change: 8.2, volume: '1.1M' },
  { asset: 'AVAX', change: -3.4, volume: '890K' },
  { asset: 'ARB', change: 15.7, volume: '650K' },
];

function Analytics() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Analytics</h1>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(performanceData).map(([period, data]) => (
          <div key={period} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-gray-400 capitalize">{period} Overview</h3>
            <div className="mt-2">
              <p className={`text-2xl font-bold ${data.value >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {data.value > 0 ? '+' : ''}{data.value}%
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Volume: ${data.volume}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Market Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-6">Top Performers</h2>
          <div className="space-y-4">
            {topPerformers.map((asset) => (
              <div key={asset.asset} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{asset.asset}</span>
                  <div>
                    <p className={`flex items-center gap-1 ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      {Math.abs(asset.change)}%
                    </p>
                    <p className="text-sm text-gray-400">Vol: ${asset.volume}</p>
                  </div>
                </div>
                <Activity className="text-blue-400" size={24} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-6">Market Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="font-medium text-white mb-2">Market Sentiment</h3>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-600 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-400 h-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-green-400">65%</span>
              </div>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="font-medium text-white mb-2">Trading Volume</h3>
              <p className="text-2xl font-bold text-blue-400">$324.5M</p>
              <p className="text-sm text-gray-400">24h Volume</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;