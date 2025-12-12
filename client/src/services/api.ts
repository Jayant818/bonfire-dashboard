const BASE_URL = (import.meta as any).env.PROD
  ? 'https://api.explorer.bonsol.org/api'
  : '/api';

export const api = {
  async getNodes() {
    const response = await fetch(`${BASE_URL}/nodes`);
    if (!response.ok) throw new Error('Failed to fetch nodes');
    return response.json();
  },

  async getLogs() {
    const response = await fetch(`${BASE_URL}/logs`);
    if (!response.ok) throw new Error('Failed to fetch logs');
    return response.json();
  },

  async getHistoryLogs(page = 1, limit = 50, order = 'desc') {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      order,
    });
    const response = await fetch(`${BASE_URL}/logs/history?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch historical logs');
    return response.json();
  },

  getLogsStream() {
    return new EventSource(`${BASE_URL}/logs/stream`);
  },

  async getJobs() {
    const response = await fetch(`${BASE_URL}/jobs`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
  },

  async getMetrics() {
    const response = await fetch(`${BASE_URL}/metrics`);
    if (!response.ok) throw new Error('Failed to fetch metrics');
    return response.json();
  },

  async getCurrentSlot() {
    const response = await fetch(`${BASE_URL}/solana/slot`);
    if (!response.ok) throw new Error('Failed to fetch slot');
    return response.json();
  },

  async getRecentBlockhash() {
    const response = await fetch(`${BASE_URL}/solana/blockhash`);
    if (!response.ok) throw new Error('Failed to fetch blockhash');
    return response.json();
  },
};
