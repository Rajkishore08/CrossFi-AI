import { create } from 'zustand';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: string;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWallet = create<WalletState>((set) => ({
  address: null,
  isConnected: false,
  balance: '0',
  connect: async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });
        
        set({
          address: accounts[0],
          isConnected: true,
          balance: (parseInt(balance, 16) / 1e18).toFixed(4)
        });
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask to use this feature');
    }
  },
  disconnect: () => {
    set({ address: null, isConnected: false, balance: '0' });
  }
}));