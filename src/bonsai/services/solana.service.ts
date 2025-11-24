import { Injectable } from '@nestjs/common';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { CacheService } from './cache.service';

@Injectable()
export class SolanaService {
  private connection: Connection;

  constructor(private readonly cacheService: CacheService) {
    this.connection = new Connection(clusterApiUrl('mainnet-beta'));
  }

  async getCurrentSlot(): Promise<number> {
    const cached = await this.cacheService.get<number>('current-slot');
    if (cached) return cached;

    const slot = await this.connection.getSlot();
    await this.cacheService.set('current-slot', slot, 5);
    return slot;
  }

  async getRecentBlockhash(): Promise<string> {
    const cached = await this.cacheService.get<string>('blockhash');
    if (cached) return cached;

    const { blockhash } = await this.connection.getLatestBlockhash();
    await this.cacheService.set('blockhash', blockhash, 10);
    return blockhash;
  }
}
