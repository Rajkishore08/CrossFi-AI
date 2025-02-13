export interface Market {
  id: string;
  title: string;
  probability: string;
  volume: string;
  endDate: string;
  description: string;
}

// Mock Polymarket service
export class PolymarketService {
  private static instance: PolymarketService;
  private constructor() {}

  static getInstance(): PolymarketService {
    if (!PolymarketService.instance) {
      PolymarketService.instance = new PolymarketService();
    }
    return PolymarketService.instance;
  }

  async getMarkets(): Promise<Market[]> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return [
      {
        id: '1',
        title: 'Will ETH reach $5000 by Q2 2024?',
        probability: '65%',
        volume: '125K USDC',
        endDate: '2024-06-30',
        description: 'Market predicting ETH price movement',
      },
      {
        id: '2',
        title: 'Will BTC halving happen before April 2024?',
        probability: '92%',
        volume: '250K USDC',
        endDate: '2024-04-30',
        description: 'Bitcoin halving event prediction',
      },
      {
        id: '3',
        title: 'Will Ethereum L2s TVL exceed $50B in 2024?',
        probability: '78%',
        volume: '180K USDC',
        endDate: '2024-12-31',
        description: 'Layer 2 adoption prediction',
      }
    ];
  }

  async placeBet(marketId: string, position: 'yes' | 'no', amount: number): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `0x${Array.from({length: 64}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('')}`;
  }

  async getMarketDetails(marketId: string): Promise<Market | null> {
    const markets = await this.getMarkets();
    return markets.find(m => m.id === marketId) || null;
  }
}