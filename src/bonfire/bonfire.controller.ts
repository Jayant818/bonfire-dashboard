import { Controller, Get, Query, Sse } from '@nestjs/common';
import { BonfireService } from './services/bonfire.service';
import { SolanaService } from './services/solana.service';
import { Observable, interval, switchMap, map, concat, of } from 'rxjs';

@Controller('api')
export class BonfireController {
  constructor(
    private readonly bonfireService: BonfireService,
    private readonly solanaService: SolanaService,
  ) {}

  @Get('nodes')
  async getNodes() {
    return this.bonfireService.getNodes();
  }

  @Get('logs')
  async getLogs() {
    return this.bonfireService.getLogs();
  }

  @Sse('logs/stream')
  logsStream(): Observable<MessageEvent> {
    return this.bonfireService.getLogsStream();
  }

  @Get('jobs')
  async getJobs() {
    return this.bonfireService.getJobs();
  }

  @Get('metrics')
  async getMetrics() {
    const nodes = await this.bonfireService.getNodes();
    return this.bonfireService.calculateMetrics(nodes);
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
