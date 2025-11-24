import { Controller, Get, Query } from '@nestjs/common';
import { BonsaiService } from './services/bonsai.service';
import { SolanaService } from './services/solana.service';

@Controller('api')
export class BonsaiController {
  constructor(
    private readonly bonsaiService: BonsaiService,
    private readonly solanaService: SolanaService,
  ) {}

  @Get('nodes')
  async getNodes() {
    return this.bonsaiService.getNodes();
  }

  @Get('logs')
  async getLogs() {
    return this.bonsaiService.getLogs();
  }

  @Get('jobs')
  async getJobs() {
    return this.bonsaiService.getJobs();
  }

  @Get('metrics')
  async getMetrics() {
    const nodes = await this.bonsaiService.getNodes();
    return this.bonsaiService.calculateMetrics(nodes);
  }

  @Get('solana/slot')
  async getCurrentSlot() {
    return this.solanaService.getCurrentSlot();
  }

  @Get('solana/blockhash')
  async getRecentBlockhash() {
    return this.solanaService.getRecentBlockhash();
  }
}
