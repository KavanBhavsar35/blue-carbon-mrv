// /frontend/lib/api.js
// API client library for frontend to use

class BlockchainAPI {
  baseUrl: string = "http://127.0.0.1:5000";
  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
  }

  async request(
    endpoint: string,
    options: {
      headers?: Record<string, string>;
      body?: any;
      [key: string]: any;
    } = {},
  ) {
    const url = `${this.baseUrl}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body !== "string") {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // GET requests
  async getAccounts() {
    return this.request("/accounts");
  }

  async getContractInfo() {
    return this.request("/contract-info");
  }

  async getDashboardData() {
    return this.request("/dashboard-data");
  }

  async checkCredits(address: any) {
    return this.request(`/check-credits/${address}`);
  }

  // POST requests
  async generateCredits(toAddress: any, amount: string, fromAddress: any) {
    return this.request("/generate-credits", {
      method: "POST",
      body: {
        to_address: toAddress,
        amount: parseInt(amount),
        from_address: fromAddress,
      },
    });
  }

  async buyCredits(amount: string, fromAddress: any) {
    return this.request("/buy-credits", {
      method: "POST",
      body: {
        amount: parseInt(amount),
        from_address: fromAddress,
      },
    });
  }

  async setPrice(priceEth: string, fromAddress: any) {
    return this.request("/set-price", {
      method: "POST",
      body: {
        price_eth: parseFloat(priceEth),
        from_address: fromAddress,
      },
    });
  }

  async withdraw(fromAddress: any) {
    return this.request("/withdraw", {
      method: "POST",
      body: {
        from_address: fromAddress,
      },
    });
  }
}

// Create singleton instance
export const blockchainAPI = new BlockchainAPI();

// Named exports for individual functions
export const {
  getAccounts,
  getContractInfo,
  getDashboardData,
  checkCredits,
  generateCredits,
  buyCredits,
  setPrice,
  withdraw,
} = blockchainAPI;
