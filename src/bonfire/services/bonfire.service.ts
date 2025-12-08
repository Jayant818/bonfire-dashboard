import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CacheService } from './cache.service';
import { Observable } from 'rxjs';

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

export interface Job {
  status: string;
  execution_id: string;
  node: string | null;
  created_at: string;
  updated_at: string;
}

export interface HistoricalLogFilter {
  source?: string;
  job_id?: string;
  image_id?: string;
  node_id?: string;
  search?: string;
  level?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
  order?: 'asc' | 'desc';
}

export interface HistoricalLogEntry {
  id: string;
  timestamp: string;
  level: string;
  message: string;
  kind: 'stdout' | 'stderr' | 'system';
  job_id?: string;
  image_id?: string;
  node_id?: string;
  meta?: any;
}

export interface HistoricalLogsResponse {
  success: boolean;
  data: HistoricalLogEntry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

@Injectable()
export class BonfireService {
  private readonly BONFIRE_API = 'https://bonfire.bonsol.org';

  constructor(private readonly cacheService: CacheService) {}

  async getNodes(): Promise<Node[]> {
    const cached = await this.cacheService.get<Node[]>('nodes');
    if (cached) return cached;

    const response = await axios.get(`${this.BONFIRE_API}/nodes`);
    const nodes = response.data;
    await this.cacheService.set('nodes', nodes, 30);
    return nodes;
  }

  async getLogs(): Promise<Log[]> {
    try {
      const response = await axios.get(`${this.BONFIRE_API}/logs`, {
        timeout: 5000,
      });
      
      let logs: Log[] = [];
      
      // Add dummy data for testing
      const dummyLogs: Log[] = [
        {
          source: 'Stdout',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stdout\n',
          timestamp: new Date().toISOString(),
        },
        {
          source: 'Stderr',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stderr\n',
          timestamp: new Date().toISOString(),
        },
        {
          source: 'Stdout',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stdout\n',
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
        {
          source: 'Stderr',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stderr\n',
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
        {
          source: 'Stdout',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stdout\n',
          timestamp: new Date(Date.now() - 120000).toISOString(),
        },
        {
          source: 'Stderr',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stderr\n',
          timestamp: new Date(Date.now() - 120000).toISOString(),
        },
        {
          source: 'Stdout',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stdout\n',
          timestamp: new Date(Date.now() - 180000).toISOString(),
        },
        {
          source: 'Stderr',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stderr\n',
          timestamp: new Date(Date.now() - 180000).toISOString(),
        },
      ];
      
      logs = dummyLogs;
      
      if (Array.isArray(response.data)) {
        logs = [...logs, ...response.data];
      }

      return logs;
    } catch (error) {
      console.error('Failed to fetch logs:', error.message);
      
      // Return dummy data even on error
      const dummyLogs: Log[] = [
        {
          source: 'Stdout',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stdout\n',
          timestamp: new Date().toISOString(),
        },
        {
          source: 'Stderr',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stderr\n',
          timestamp: new Date().toISOString(),
        },
        {
          source: 'Stdout',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stdout\n',
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
        {
          source: 'Stderr',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stderr\n',
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
        {
          source: 'Stdout',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stdout\n',
          timestamp: new Date(Date.now() - 120000).toISOString(),
        },
        {
          source: 'Stderr',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stderr\n',
          timestamp: new Date(Date.now() - 120000).toISOString(),
        },
        {
          source: 'Stdout',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stdout\n',
          timestamp: new Date(Date.now() - 180000).toISOString(),
        },
        {
          source: 'Stderr',
          image_id: '46e9424be27e307a498d049d7b2a8cfef27733f989e48c5dc74928aa14a9ac67',
          job_id: '2ef4cb548bb2c36b221c4001692b565b',
          log: 'Yo stderr\n',
          timestamp: new Date(Date.now() - 180000).toISOString(),
        },
      ];
      
      return dummyLogs;
    }
  }

  calculateMetrics(nodes: Node[]) {
    const totalNodes = nodes.length;
    const totalGpus = nodes.reduce((sum, node) => sum + (node.hw.gpus?.length || 0), 0);
    const totalMemory = nodes.reduce((sum, node) => sum + node.hw.memory_bytes, 0);
    const avgLatency = nodes.reduce((sum, node) => sum + node.latency, 0) / totalNodes || 0;
    const totalCores = nodes.reduce((sum, node) => sum + node.hw.cpu_cores, 0);

    return {
      totalNodes,
      totalGpus,
      totalMemory,
      avgLatency,
      totalCores,
    };
  }

  async getJobs(): Promise<Job[]> {
    try {
      const response = await axios.get(`${this.BONFIRE_API}/jobs`, {
        timeout: 5000,
      });
      
      let jobs: Job[] = [];
      
      // Add dummy data for testing with static timestamps
      const baseTime = new Date('2025-11-21T14:00:00.000Z').getTime();
      const dummyJobs: Job[] = [
        {
          status: 'Submitted',
          execution_id: 'ocr_1763734011065_pitoABye',
          node: null,
          created_at: new Date(baseTime + 416000).toISOString(),
          updated_at: new Date(baseTime + 416000).toISOString(),
        },
        {
          status: 'Running',
          execution_id: 'ocr_1763734022134_xKlmNoPq',
          node: '66ipxbdjkKizkwcPdNjCrkZKj72kU7fm8DRRVgAGfeQu',
          created_at: new Date(baseTime + 422000).toISOString(),
          updated_at: new Date(baseTime + 435000).toISOString(),
        },
        {
          status: 'Completed',
          execution_id: 'ocr_1763733998877_AbCdEfGh',
          node: '66ipxbdjkKizkwcPdNjCrkZKj72kU7fm8DRRVgAGfeQu',
          created_at: new Date(baseTime + 398000).toISOString(),
          updated_at: new Date(baseTime + 415000).toISOString(),
        },
        {
          status: 'Failed',
          execution_id: 'ocr_1763733987654_ZyXwVuTs',
          node: '66ipxbdjkKizkwcPdNjCrkZKj72kU7fm8DRRVgAGfeQu',
          created_at: new Date(baseTime + 387000).toISOString(),
          updated_at: new Date(baseTime + 392000).toISOString(),
        },
        {
          status: 'Submitted',
          execution_id: 'ocr_1763734033456_QrStUvWx',
          node: null,
          created_at: new Date(baseTime + 433000).toISOString(),
          updated_at: new Date(baseTime + 433000).toISOString(),
        },
        {
          status: 'Running',
          execution_id: 'ocr_1763734044567_IjKlMnOp',
          node: '66ipxbdjkKizkwcPdNjCrkZKj72kU7fm8DRRVgAGfeQu',
          created_at: new Date(baseTime + 444000).toISOString(),
          updated_at: new Date(baseTime + 450000).toISOString(),
        },
        {
          status: 'Completed',
          execution_id: 'ocr_1763733976543_AbCdEfGh',
          node: '66ipxbdjkKizkwcPdNjCrkZKj72kU7fm8DRRVgAGfeQu',
          created_at: new Date(baseTime + 376000).toISOString(),
          updated_at: new Date(baseTime + 385000).toISOString(),
        },
        {
          status: 'Submitted',
          execution_id: 'ocr_1763734055678_PqRsTuVw',
          node: null,
          created_at: new Date(baseTime + 455000).toISOString(),
          updated_at: new Date(baseTime + 455000).toISOString(),
        },
      ];
      
      // jobs = dummyJobs;
      
      if (Array.isArray(response.data)) {
        jobs = [...jobs, ...response.data];
      }

      return jobs;
    } catch (error) {
      console.error('Failed to fetch jobs:', error.message);
      
      // Return dummy data even on error with static timestamps
      const baseTime = new Date('2025-11-21T14:00:00.000Z').getTime();
      const dummyJobs: Job[] = [
        {
          status: 'Submitted',
          execution_id: 'ocr_1763734011065_pitoABye',
          node: null,
          created_at: new Date(baseTime + 416000).toISOString(),
          updated_at: new Date(baseTime + 416000).toISOString(),
        },
        {
          status: 'Running',
          execution_id: 'ocr_1763734022134_xKlmNoPq',
          node: '66ipxbdjkKizkwcPdNjCrkZKj72kU7fm8DRRVgAGfeQu',
          created_at: new Date(baseTime + 422000).toISOString(),
          updated_at: new Date(baseTime + 435000).toISOString(),
        },
        {
          status: 'Completed',
          execution_id: 'ocr_1763733998877_AbCdEfGh',
          node: '66ipxbdjkKizkwcPdNjCrkZKj72kU7fm8DRRVgAGfeQu',
          created_at: new Date(baseTime + 398000).toISOString(),
          updated_at: new Date(baseTime + 415000).toISOString(),
        },
        {
          status: 'Failed',
          execution_id: 'ocr_1763733987654_ZyXwVuTs',
          node: '66ipxbdjkKizkwcPdNjCrkZKj72kU7fm8DRRVgAGfeQu',
          created_at: new Date(baseTime + 387000).toISOString(),
          updated_at: new Date(baseTime + 392000).toISOString(),
        },
        {
          status: 'Submitted',
          execution_id: 'ocr_1763734033456_QrStUvWx',
          node: null,
          created_at: new Date(baseTime + 433000).toISOString(),
          updated_at: new Date(baseTime + 433000).toISOString(),
        },
        {
          status: 'Running',
          execution_id: 'ocr_1763734044567_IjKlMnOp',
          node: '66ipxbdjkKizkwcPdNjCrkZKj72kU7fm8DRRVgAGfeQu',
          created_at: new Date(baseTime + 444000).toISOString(),
          updated_at: new Date(baseTime + 450000).toISOString(),
        },
        {
          status: 'Completed',
          execution_id: 'ocr_1763733976543_AbCdEfGh',
          node: '66ipxbdjkKizkwcPdNjCrkZKj72kU7fm8DRRVgAGfeQu',
          created_at: new Date(baseTime + 376000).toISOString(),
          updated_at: new Date(baseTime + 385000).toISOString(),
        },
        {
          status: 'Submitted',
          execution_id: 'ocr_1763734055678_PqRsTuVw',
          node: null,
          created_at: new Date(baseTime + 455000).toISOString(),
          updated_at: new Date(baseTime + 455000).toISOString(),
        },
      ];
      
      // return dummyJobs;
      return [];
    }
  }

  async getHistoricalLogs(filter: HistoricalLogFilter): Promise<HistoricalLogsResponse> {
    const startTime = Date.now();
    const page = Number(filter.page) || 1;
    const limit = Number(filter.limit) || 50;

    let allLogs: HistoricalLogEntry[] = [];

    try {
      // Fetch logs from external API or generate dummy data
      const response = await axios.get(`${this.BONFIRE_API}/logs`, {
        timeout: 5000,
      });

      if (Array.isArray(response.data)) {
        allLogs = response.data.map((log: any, index: number) => ({
          id: `log-${Date.now()}-${index}`,
          timestamp: log.timestamp || new Date().toISOString(),
          level: 'info',
          message: log.log || '',
          kind: log.source?.toLowerCase() === 'stderr' ? 'stderr' : 'stdout',
          job_id: log.job_id,
          image_id: log.image_id,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch historical logs, falling back to dummy data:', error.message);
      // Fallback to empty logs, which will trigger dummy generation below
      allLogs = [];
    }

    // Apply filters
    let filteredLogs = allLogs;

    if (filter.source) {
      filteredLogs = filteredLogs.filter(log => log.kind === filter.source?.toLowerCase());
    }
    if (filter.job_id) {
      filteredLogs = filteredLogs.filter(log => log.job_id?.includes(filter.job_id));
    }
    if (filter.image_id) {
      filteredLogs = filteredLogs.filter(log => log.image_id?.includes(filter.image_id));
    }
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filteredLogs = filteredLogs.filter(log => log.message.toLowerCase().includes(searchLower));
    }

    // If no real logs after filtering (or error), generate dummy logs
    if (filteredLogs.length === 0) {
      console.log('Generating dummy historical logs...');
      const dummyLogs: HistoricalLogEntry[] = [];
      const baseTime = Date.now();
      for (let i = 0; i < 50; i++) {
        const timestamp = new Date(baseTime - i * 1000).toISOString(); // Decreasing timestamps for recent history
        dummyLogs.push({
          id: `dummy-log-${i}-${Date.now()}`,
          timestamp: timestamp,
          level: i % 2 === 0 ? 'info' : 'warn',
          message: `[Dummy Log ${i}] This is a dummy historical log message for testing purposes. Job ID: dummy-job-${Math.floor(Math.random() * 10)}, Image ID: dummy-image-${Math.floor(Math.random() * 5)}`,
          kind: i % 3 === 0 ? 'stderr' : 'stdout',
          job_id: `dummy-job-${Math.floor(Math.random() * 10)}`,
          image_id: `dummy-image-${Math.floor(Math.random() * 5)}`,
        });
      }
      
      // Apply filters to dummy logs too
      let tempFilteredDummyLogs = dummyLogs;
      if (filter.source) {
        tempFilteredDummyLogs = tempFilteredDummyLogs.filter(log => log.kind === filter.source?.toLowerCase());
      }
      if (filter.job_id) {
        tempFilteredDummyLogs = tempFilteredDummyLogs.filter(log => log.job_id?.includes(filter.job_id));
      }
      if (filter.image_id) {
        tempFilteredDummyLogs = tempFilteredDummyLogs.filter(log => log.image_id?.includes(filter.image_id));
      }
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        tempFilteredDummyLogs = tempFilteredDummyLogs.filter(log => log.message.toLowerCase().includes(searchLower));
      }
      filteredLogs = tempFilteredDummyLogs;
    }

    // Sort by timestamp
    filteredLogs.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return filter.order === 'asc' ? timeA - timeB : timeB - timeA;
    });

    // Paginate
    const total = filteredLogs.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedLogs = filteredLogs.slice(startIndex, startIndex + limit);

          return {
            success: true,
            data: paginatedLogs,
            pagination: {
              page,
              limit,
              total,
              total_pages: totalPages,
            },
          };  }

  getLogsStream(): Observable<MessageEvent> {
    return new Observable((subscriber) => {
      const axios = require('axios');
      
      const connectToStream = async () => {
        try {
          const response = await axios.get('https://bonfire.bonsol.org/logs', {
            responseType: 'stream',
            timeout: 0,
          });

          response.data.on('data', (chunk: Buffer) => {
            const lines = chunk.toString().split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const logData = JSON.parse(line.substring(6));
                  logData.timestamp = new Date().toISOString();
                  subscriber.next({ data: JSON.stringify(logData) } as MessageEvent);
                } catch (e) {
                  console.error('Failed to parse log:', e);
                }
              }
            }
          });

          response.data.on('error', (error: any) => {
            console.error('Log stream error:', error);
            setTimeout(connectToStream, 5000);
          });

          response.data.on('end', () => {
            console.log('Log stream ended, reconnecting...');
            setTimeout(connectToStream, 1000);
          });
        } catch (error) {
          console.error('Failed to connect to logs stream:', error);
          setTimeout(connectToStream, 5000);
        }
      };

      connectToStream();

      return () => {
        console.log('Logs stream subscription ended');
      };
    });
  }
}
