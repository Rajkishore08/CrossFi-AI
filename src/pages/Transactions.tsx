import React from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

const transactions = [
  { 
    type: 'Deposit',
    asset: 'ETH',
    amount: '2.5',
    value: '4,500',
    timestamp: '2024-03-15 14:30',
    status: 'Completed',
    hash: '0x1234...5678'
  },
  {
    type: 'Withdraw',
    asset: 'USDC',
    amount: '5000',
    value: '5,000',
    timestamp: '2024-03-14 09:15',
    status: 'Completed',
    hash: '0x8765...4321'
  },
  {
    type: 'Swap',
    asset: 'MATIC → USDT',
    amount: '1000',
    value: '1,200',
    timestamp: '2024-03-13 16:45',
    status: 'Pending',
    hash: '0x9876...1234'
  }
];

function Transactions() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Transaction History</h1>

      {/* Transaction Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
          All
        </button>
        <button className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all duration-200">
          Deposits
        </button>
        <button className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all duration-200">
          Withdrawals
        </button>
        <button className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all duration-200">
          Swaps
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-4 text-left text-gray-400">Type</th>
                <th className="px-6 py-4 text-left text-gray-400">Asset</th>
                <th className="px-6 py-4 text-left text-gray-400">Amount</th>
                <th className="px-6 py-4 text-left text-gray-400">Value (USD)</th>
                <th className="px-6 py-4 text-left text-gray-400">Time</th>
                <th className="px-6 py-4 text-left text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-gray-400">Hash</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index} className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {tx.type === 'Deposit' && <ArrowDownRight className="text-green-400" size={20} />}
                      {tx.type === 'Withdraw' && <ArrowUpRight className="text-red-400" size={20} />}
                      {tx.type === 'Swap' && <RefreshCw className="text-blue-400" size={20} />}
                      <span className="text-white">{tx.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{tx.asset}</td>
                  <td className="px-6 py-4 text-white">{tx.amount}</td>
                  <td className="px-6 py-4 text-white">${tx.value}</td>
                  <td className="px-6 py-4 text-gray-400">{tx.timestamp}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      tx.status === 'Completed' ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                      {tx.hash}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transactions;