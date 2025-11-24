import { Injectable } from "@nestjs/common";
import axios from "axios";
import { CacheService } from "./cache.service";

export interface Node {
  pubkey: string;
  hw: {
    cpu_type: string;
    cpu_mhz: number;
    cpu_cores: number;
    memory_bytes: number;
    gpus: Array<{
      gpu_model: string;
      gpu_memory_bytes: number;
    }>;
  };
  latency: number;
}

export interface Log {
  source: string;
  image_id: string;
  job_id: string;
  log: string;
  timestamp?: string;
}

export interface LogFilter {
  source?: string;
  imageId?: string;
  jobId?: string;
}

@Injectable()
export class BonsaiService {
  private readonly BONSAI_API = "https://bonfire.bonsol.org";

  constructor(private readonly cacheService: CacheService) {}

  async getNodes(): Promise<Node[]> {
    const cached = await this.cacheService.get<Node[]>("nodes");
    if (cached) return cached;

    const response = await axios.get(`${this.BONSAI_API}/nodes`);
    const nodes = response.data;
    await this.cacheService.set("nodes", nodes, 30);
    return nodes;
  }

  async getLogs(): Promise<Log[]> {
    try {
      const response = await axios.get(`${this.BONSAI_API}/logs`, {
        timeout: 5000,
      });

      let logs: Log[] = [];

      // Add dummy data for testing
      const dummyLogs: Log[] = [
        {
          source: "Stdout",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stdout\n",
          timestamp: new Date().toISOString(),
        },
        {
          source: "Stderr",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stderr\n",
          timestamp: new Date().toISOString(),
        },
        {
          source: "Stdout",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stdout\n",
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
        {
          source: "Stderr",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stderr\n",
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
        {
          source: "Stdout",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stdout\n",
          timestamp: new Date(Date.now() - 120000).toISOString(),
        },
        {
          source: "Stderr",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stderr\n",
          timestamp: new Date(Date.now() - 120000).toISOString(),
        },
        {
          source: "Stdout",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stdout\n",
          timestamp: new Date(Date.now() - 180000).toISOString(),
        },
        {
          source: "Stderr",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stderr\n",
          timestamp: new Date(Date.now() - 180000).toISOString(),
        },
      ];

      logs = dummyLogs;

      if (Array.isArray(response.data)) {
        logs = [...logs, ...response.data];
      }

      return logs;
    } catch (error) {
      console.error("Failed to fetch logs:", error.message);

      // Return dummy data even on error
      const dummyLogs: Log[] = [
        {
          source: "Stdout",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stdout\n",
          timestamp: new Date().toISOString(),
        },
        {
          source: "Stderr",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stderr\n",
          timestamp: new Date().toISOString(),
        },
        {
          source: "Stdout",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stdout\n",
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
        {
          source: "Stderr",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stderr\n",
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
        {
          source: "Stdout",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stdout\n",
          timestamp: new Date(Date.now() - 120000).toISOString(),
        },
        {
          source: "Stderr",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stderr\n",
          timestamp: new Date(Date.now() - 120000).toISOString(),
        },
        {
          source: "Stdout",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stdout\n",
          timestamp: new Date(Date.now() - 180000).toISOString(),
        },
        {
          source: "Stderr",
          image_id:
            "46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67",
          job_id: "2ef4cb548bb2c36b221c4001692b565b",
          log: "Yo stderr\n",
          timestamp: new Date(Date.now() - 180000).toISOString(),
        },
      ];

      return dummyLogs;
    }
  }

  calculateMetrics(nodes: Node[]) {
    const totalNodes = nodes.length;
    const totalGpus = nodes.reduce(
      (sum, node) => sum + (node.hw.gpus?.length || 0),
      0
    );
    const totalMemory = nodes.reduce(
      (sum, node) => sum + node.hw.memory_bytes,
      0
    );
    const avgLatency =
      nodes.reduce((sum, node) => sum + node.latency, 0) / totalNodes || 0;
    const totalCores = nodes.reduce((sum, node) => sum + node.hw.cpu_cores, 0);

    return {
      totalNodes,
      totalGpus,
      totalMemory,
      avgLatency,
      totalCores,
    };
  }
}
