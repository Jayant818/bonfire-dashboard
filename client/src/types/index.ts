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

export interface Metrics {
  totalNodes: number;
  totalGpus: number;
  totalMemory: number;
  avgLatency: number;
  totalCores: number;
}
