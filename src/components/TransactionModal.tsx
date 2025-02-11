import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TransactionModalProps {
  type: 'deposit' | 'withdraw' | 'swap';
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ type, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [asset, setAsset] = useState('ETH');
  const [targetAsset, setTargetAsset] = useState('USDC');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ amount, asset, targetAsset });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative border border-gray-700">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold text-white mb-6 capitalize">{type} Assets</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Asset
            </label>
            <select
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            >
              <option value="ETH">ETH</option>
              <option value="USDC">USDC</option>
              <option value="MATIC">MATIC</option>
              <option value="AVAX">AVAX</option>
            </select>
          </div>

          {type === 'swap' && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                To Asset
              </label>
              <select
                value={targetAsset}
                onChange={(e) => setTargetAsset(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              >
                <option value="USDC">USDC</option>
                <option value="ETH">ETH</option>
                <option value="MATIC">MATIC</option>
                <option value="AVAX">AVAX</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              placeholder="0.0"
              step="0.000001"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            Confirm {type}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;