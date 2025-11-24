import { Controller, Get, Query, Sse } from "@nestjs/common";
import { BonsaiService } from "./services/bonsai.service";
import { SolanaService } from "./services/solana.service";
import { Observable, interval, switchMap, map, concat, of } from "rxjs";

@Controller("api")
export class BonsaiController {
  constructor(
    private readonly bonsaiService: BonsaiService,
    private readonly solanaService: SolanaService
  ) {}

  @Get("nodes")
  async getNodes() {
    return this.bonsaiService.getNodes();
  }

  @Get("logs")
  async getLogs() {
    return this.bonsaiService.getLogs();
  }

  @Sse("logs/stream")
  logsStream(): Observable<MessageEvent> {
    return this.bonsaiService.getLogsStream();
  }

  @Get("jobs")
  async getJobs() {
    return this.bonsaiService.getJobs();
  }

  @Sse("jobs/stream")
  jobsStream(): Observable<MessageEvent> {
    return this.bonsaiService.getJobsStream();
  }

  @Get("metrics")
  async getMetrics() {
    const nodes = await this.bonsaiService.getNodes();
    return this.bonsaiService.calculateMetrics(nodes);
  }

  @Get("solana/slot")
  async getCurrentSlot() {
    return this.solanaService.getCurrentSlot();
  }

  @Get("solana/blockhash")
  async getRecentBlockhash() {
    return this.solanaService.getRecentBlockhash();
  }
}
