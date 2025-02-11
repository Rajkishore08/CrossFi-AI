import React from 'react';
import { X, Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

interface ConnectWalletProps {
  onClose: () => void;
}

const wallets = [
  { name: 'MetaMask', icon: '🦊' },
  { name: 'WalletConnect', icon: '🔗' },
  { name: 'Coinbase Wallet', icon: '📱' },
  { name: 'Trust Wallet', icon: '🔒' },
];

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onClose }) => {
  const { connect } = useWallet();

  const handleConnect = async (walletName: string) => {
    if (walletName === 'MetaMask') {
      await connect();
      onClose();
    } else {
      alert('Coming soon! Only MetaMask is supported in this version.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative border border-gray-700">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
          <Wallet className="text-blue-400" size={24} />
          <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
        </div>
        
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet.name)}
              className="w-full flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{wallet.icon}</span>
                <span className="font-medium text-white">{wallet.name}</span>
              </div>
              <span className="text-blue-400">Connect</span>
            </button>
          ))}
        </div>
        
        <p className="mt-6 text-sm text-gray-400 text-center">
          By connecting a wallet, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default ConnectWallet;