import { Module } from '@nestjs/common';
import { BonsaiController } from './bonsai.controller';
import { BonsaiService } from './services/bonsai.service';
import { SolanaService } from './services/solana.service';
import { CacheService } from './services/cache.service';

@Module({
  controllers: [BonsaiController],
  providers: [BonsaiService, SolanaService, CacheService],
})
export class BonsaiModule {}
