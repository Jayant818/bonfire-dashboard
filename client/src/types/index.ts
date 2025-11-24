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

export interface Job {
  status: string;
  execution_id: string;
  node: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobFilter {
  status?: string;
  executionId?: string;
  node?: string;
}
