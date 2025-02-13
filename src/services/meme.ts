export interface MemeConfig {
  topic: string;
  style: 'funny' | 'serious' | 'sarcastic' | 'motivational';
}

export class MemeService {
  private static instance: MemeService;
  private constructor() {}

  static getInstance(): MemeService {
    if (!MemeService.instance) {
      MemeService.instance = new MemeService();
    }
    return MemeService.instance;
  }

  async generateMeme(config: MemeConfig): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock meme URLs from Unsplash
    const memeUrls = [
      'https://images.unsplash.com/photo-1621504450181-5d356f61d307',
      'https://images.unsplash.com/photo-1622473590773-f588134b6ce7',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71'
    ];
    
    return memeUrls[Math.floor(Math.random() * memeUrls.length)];
  }

  async shareMeme(imageUrl: string, platform: 'twitter' | 'discord'): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  }
}