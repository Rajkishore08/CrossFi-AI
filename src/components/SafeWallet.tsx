import React, { useState, useEffect } from 'react';
import { Shield, Key, Send, Loader } from 'lucide-react';
import { SafeService } from '../services/safe';

const SafeWallet = () => {
  const [safeAddress, setSafeAddress] = useState('');
  const [balance, setBalance] = useState('0.00');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const safeService = SafeService.getInstance();

  const deploySafe = async () => {
    setIsDeploying(true);
    try {
      const address = await safeService.deploySafe();
      setSafeAddress(address);
      updateBalance(address);
    } catch (error) {
      console.error('Failed to deploy Safe:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  const updateBalance = async (address: string) => {
    try {
      const newBalance = await safeService.getBalance(address);
      setBalance(newBalance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const sendTransaction = async () => {
    if (!recipient || !amount) return;
    
    setIsSending(true);
    try {
      await safeService.sendTransaction(recipient, amount);
      setRecipient('');
      setAmount('');
      updateBalance(safeAddress);
    } catch (error) {
      console.error('Failed to send transaction:', error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (safeAddress) {
      updateBalance(safeAddress);
    }
  }, [safeAddress]);

  return (
    <div className="text-white">
      <div className="flex items-center mb-6">
        <Shield className="w-8 h-8 mr-3 text-blue-500" />
        <h2 className="text-2xl font-bold">Safe Smart Account</h2>
      </div>

      {!safeAddress ? (
        <div className="bg-gray-700 rounded-lg p-6">
          <p className="mb-4">Deploy a new Safe smart account to get started</p>
          <button
            onClick={deploySafe}
            disabled={isDeploying}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50"
          >
            {isDeploying ? (
              <Loader className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Key className="w-5 h-5 mr-2" />
            )}
            {isDeploying ? 'Deploying...' : 'Deploy Safe Wallet'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Wallet Info</h3>
            <div className="space-y-2">
              <p className="text-gray-300">
                Address: <span className="text-blue-400">{safeAddress}</span>
              </p>
              <p className="text-gray-300">
                Balance: <span className="text-green-400">{balance} ETH</span>
              </p>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Send Transaction</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white"
                  placeholder="0x..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white"
                  placeholder="0.0"
                  step="0.01"
                />
              </div>
              <button
                onClick={sendTransaction}
                disabled={isSending || !recipient || !amount}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50"
              >
                {isSending ? (
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                {isSending ? 'Sending...' : 'Send Transaction'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafeWallet;