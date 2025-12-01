import { Module } from '@nestjs/common';
import { BonfireController } from './bonfire.controller';
import { BonfireService } from './services/bonfire.service';
import { SolanaService } from './services/solana.service';
import { CacheService } from './services/cache.service';

@Module({
  controllers: [BonfireController],
  providers: [BonfireService, SolanaService, CacheService],
})
export class BonfireModule {}
