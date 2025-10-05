export interface BlockchainInfo {
  status: string;
  contractAddress: string;
  creditPrice: string;
  ownerCredits: number;
  isConnected: boolean;
}

export interface TransactionResult {
  status: string;
  txHash: string;
  amount?: number;
  totalCost?: string;
  address?: string;
}

export interface CheckCreditsResult {
  status: string;
  credits: number;
  address: string;
  balance: number;
}

class BlockchainAPI {
  private baseUrl = "/api/blockchain";

  async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Request failed");
    }

    return data;
  }

  async getContractInfo(): Promise<BlockchainInfo> {
    return this.request("/info");
  }

  async generateCredits(
    amount: number,
    address?: string,
    projectId?: string,
  ): Promise<TransactionResult> {
    return this.request("/generate", {
      method: "POST",
      body: JSON.stringify({ amount, address, project_id: projectId }),
    });
  }

  async buyCredits(
    amount: number,
    address?: string,
    privateKey?: string,
  ): Promise<TransactionResult> {
    return this.request("/buy", {
      method: "POST",
      body: JSON.stringify({ amount, address, private_key: privateKey }),
    });
  }

  async checkCredits(address: string): Promise<CheckCreditsResult> {
    return this.request(`/check/${address}`);
  }

  async setCreditPrice(price: number): Promise<TransactionResult> {
    return this.request("/set-price", {
      method: "POST",
      body: JSON.stringify({ price }),
    });
  }

  async withdrawFunds(): Promise<TransactionResult> {
    return this.request("/withdraw", {
      method: "POST",
    });
  }
}

export const blockchainAPI = new BlockchainAPI();
