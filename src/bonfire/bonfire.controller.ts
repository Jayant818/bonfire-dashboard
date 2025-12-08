import { Controller, Get, Sse, Query } from '@nestjs/common';
import { BonfireService, HistoricalLogFilter } from './services/bonfire.service';
import { SolanaService } from './services/solana.service';
import { Observable } from 'rxjs';

@Controller('api')
export class BonfireController {
  constructor(
    private readonly bonfireService: BonfireService,
    private readonly solanaService: SolanaService,
  ) { }

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

  @Get('logs/history')
  async getHistoricalLogs(@Query() filter: HistoricalLogFilter) {
    return this.bonfireService.getHistoricalLogs(filter);
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

  @Get('health')
  async getHealth() {
    return "OK";
  }
}
