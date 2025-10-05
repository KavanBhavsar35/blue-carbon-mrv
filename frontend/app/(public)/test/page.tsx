"use client";
import React, { useState, useEffect } from "react";
import {
  Wallet,
  Leaf,
  DollarSign,
  Users,
  TrendingUp,
  Settings,
  Download,
} from "lucide-react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";

// Type definitions based on Flask backend
interface Account {
  address: string;
  role: "owner" | "buyer";
  eth_balance: number;
  credits: number;
}

interface ContractInfo {
  contract_address: string;
  owner: string;
  credit_price_wei: number;
  credit_price_eth: number;
  contract_balance_eth: number;
}

interface DashboardData {
  contract: {
    address: string;
    owner: string;
    credit_price_eth: number;
    balance_eth: number;
  };
  accounts: Account[];
  stats: {
    total_credits_issued: number;
    total_accounts: number;
  };
}

interface ApiResponse<T = any> {
  status: "success" | "error";
  message?: string;
  txHash?: string;
  [key: string]: any;
}

interface GenerateCreditsRequest {
  to_address: string;
  amount: number;
  from_address: string;
}

interface BuyCreditsRequest {
  amount: number;
  from_address: string;
}

interface SetPriceRequest {
  price_eth: number;
  from_address: string;
}

interface WithdrawRequest {
  from_address: string;
}

interface BuyCreditsResponse extends ApiResponse {
  amount: number;
  total_cost_wei: number;
  total_cost_eth: number;
}

interface GenerateCreditsResponse extends ApiResponse {
  generated_to: string;
  amount: number;
}

interface LogEntry {
  id: number;
  message: string;
  type: "info" | "success" | "error";
  timestamp: string;
}

// API client class with TypeScript
class BlockchainAPI {
  private baseUrl: string;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
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

  async getAccounts(): Promise<{ accounts: Account[] }> {
    return this.request("/accounts");
  }

  async getContractInfo(): Promise<ContractInfo> {
    return this.request("/contract-info");
  }

  async getDashboardData(): Promise<DashboardData> {
    return this.request("/dashboard-data");
  }

  async checkCredits(
    address: string,
  ): Promise<{ address: string; credits: number }> {
    return this.request(`/check-credits/${address}`);
  }

  async generateCredits(
    toAddress: string,
    amount: number,
    fromAddress: string,
  ): Promise<GenerateCreditsResponse> {
    return this.request("/generate-credits", {
      method: "POST",
      body: JSON.stringify({
        to_address: toAddress,
        amount: parseInt(amount.toString()),
        from_address: fromAddress,
      } as GenerateCreditsRequest),
    });
  }

  async buyCredits(
    amount: number,
    fromAddress: string,
  ): Promise<BuyCreditsResponse> {
    return this.request("/buy-credits", {
      method: "POST",
      body: JSON.stringify({
        amount: parseInt(amount.toString()),
        from_address: fromAddress,
      } as BuyCreditsRequest),
    });
  }

  async setPrice(priceEth: number, fromAddress: string): Promise<ApiResponse> {
    return this.request("/set-price", {
      method: "POST",
      body: JSON.stringify({
        price_eth: parseFloat(priceEth.toString()),
        from_address: fromAddress,
      } as SetPriceRequest),
    });
  }

  async withdraw(fromAddress: string): Promise<ApiResponse> {
    return this.request("/withdraw", {
      method: "POST",
      body: JSON.stringify({
        from_address: fromAddress,
      } as WithdrawRequest),
    });
  }
}

const api = new BlockchainAPI();

// Form state interfaces
interface GenerateForm {
  toAddress: string;
  amount: string;
}

interface BuyForm {
  amount: string;
}

interface PriceForm {
  newPrice: string;
}

const BlueCarbonCreditsDemo: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [contractInfo, setContractInfo] = useState<ContractInfo | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );

  // Form states
  const [generateForm, setGenerateForm] = useState<GenerateForm>({
    toAddress: "",
    amount: "",
  });
  const [buyForm, setBuyForm] = useState<BuyForm>({ amount: "1" });
  const [priceForm, setPriceForm] = useState<PriceForm>({ newPrice: "" });

  const addLog = (message: string, type: LogEntry["type"] = "info"): void => {
    const timestamp = new Date().toLocaleTimeString();

    setLogs((prev) => [
      {
        id: Date.now(),
        message,
        type,
        timestamp,
      },
      ...prev.slice(0, 9),
    ]);
  };

  const fetchAccounts = async (): Promise<void> => {
    try {
      const data = await api.getAccounts();

      setAccounts(data.accounts || []);
      if (!selectedAccount && data.accounts?.length > 0) {
        setSelectedAccount(data.accounts[1].address); // Default to first buyer
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      addLog(`Error fetching accounts: ${errorMessage}`, "error");
    }
  };

  const fetchContractInfo = async (): Promise<void> => {
    try {
      const data = await api.getContractInfo();

      setContractInfo(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      addLog(`Error fetching contract info: ${errorMessage}`, "error");
    }
  };

  const fetchDashboardData = async (): Promise<void> => {
    try {
      const data = await api.getDashboardData();

      setDashboardData(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      addLog(`Error fetching dashboard data: ${errorMessage}`, "error");
    }
  };

  const refreshData = async (): Promise<void> => {
    setLoading(true);
    await Promise.all([
      fetchAccounts(),
      fetchContractInfo(),
      fetchDashboardData(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 10000); // Auto-refresh every 10s

    return () => clearInterval(interval);
  }, []);

  const handleGenerateCredits = async (): Promise<void> => {
    if (!generateForm.toAddress || !generateForm.amount) {
      addLog("Please fill in all fields for credit generation", "error");

      return;
    }

    setLoading(true);
    try {
      const ownerAccount = accounts.find((acc) => acc.role === "owner");

      if (!ownerAccount) {
        addLog("Owner account not found", "error");

        return;
      }

      const data = await api.generateCredits(
        generateForm.toAddress,
        parseInt(generateForm.amount),
        ownerAccount.address,
      );

      if (data.status === "success") {
        addLog(
          `✅ Generated ${generateForm.amount} credits to ${generateForm.toAddress.slice(0, 10)}...`,
          "success",
        );
        setGenerateForm({ toAddress: "", amount: "" });
        refreshData();
      } else {
        addLog(`❌ Generation failed: ${data.message}`, "error");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      addLog(`❌ Generation error: ${errorMessage}`, "error");
    }
    setLoading(false);
  };

  const handleBuyCredits = async (): Promise<void> => {
    if (!selectedAccount || !buyForm.amount) {
      addLog("Please select account and amount", "error");

      return;
    }

    setLoading(true);
    try {
      const data = await api.buyCredits(
        parseInt(buyForm.amount),
        selectedAccount,
      );

      if (data.status === "success") {
        addLog(
          `💰 Bought ${buyForm.amount} credits for ${data.total_cost_eth} ETH`,
          "success",
        );
        setBuyForm({ amount: "1" });
        refreshData();
      } else {
        addLog(`❌ Purchase failed: ${data.message}`, "error");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      addLog(`❌ Purchase error: ${errorMessage}`, "error");
    }
    setLoading(false);
  };

  const handleSetPrice = async (): Promise<void> => {
    if (!priceForm.newPrice) {
      addLog("Please enter new price", "error");

      return;
    }

    setLoading(true);
    try {
      const ownerAccount = accounts.find((acc) => acc.role === "owner");

      if (!ownerAccount) {
        addLog("Owner account not found", "error");

        return;
      }

      const data = await api.setPrice(
        parseFloat(priceForm.newPrice),
        ownerAccount.address,
      );

      if (data.status === "success") {
        addLog(`💲 Price updated to ${priceForm.newPrice} ETH`, "success");
        setPriceForm({ newPrice: "" });
        refreshData();
      } else {
        addLog(`❌ Price update failed: ${data.message}`, "error");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      addLog(`❌ Price update error: ${errorMessage}`, "error");
    }
    setLoading(false);
  };

  const handleWithdraw = async (): Promise<void> => {
    setLoading(true);
    try {
      const ownerAccount = accounts.find((acc) => acc.role === "owner");

      if (!ownerAccount) {
        addLog("Owner account not found", "error");

        return;
      }

      const data = await api.withdraw(ownerAccount.address);

      if (data.status === "success") {
        addLog(`💸 Contract balance withdrawn to owner`, "success");
        refreshData();
      } else {
        addLog(`❌ Withdrawal failed: ${data.message}`, "error");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      addLog(`❌ Withdrawal error: ${errorMessage}`, "error");
    }
    setLoading(false);
  };

  const selectedAccountData = accounts.find(
    (acc) => acc.address === selectedAccount,
  );
  const ownerAccount = accounts.find((acc) => acc.role === "owner");

  const handleAccountSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setSelectedAccount(event.target.value);
  };

  const handleGenerateFormChange =
    (field: keyof GenerateForm) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
      setGenerateForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleBuyFormChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setBuyForm({ amount: event.target.value });
  };

  const handlePriceFormChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPriceForm({ newPrice: event.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="h-10 w-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Blue Carbon Credits
            </h1>
          </div>
          <p className="text-gray-600">Next.js + Flask Blockchain Demo</p>
          <Chip className="mt-2" variant="flat">
            Using API Proxy
          </Chip>
          <br />
          <Button className="mt-2" disabled={loading} onPress={refreshData}>
            {loading ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>

        {/* Dashboard Stats */}
        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardBody className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Credit Price</p>
                    <p className="text-xl font-bold">
                      {dashboardData.contract.credit_price_eth} ETH
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-4">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Contract Balance</p>
                    <p className="text-xl font-bold">
                      {dashboardData.contract.balance_eth.toFixed(4)} ETH
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-4">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Credits</p>
                    <p className="text-xl font-bold">
                      {dashboardData.stats.total_credits_issued}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Active Accounts</p>
                    <p className="text-xl font-bold">
                      {dashboardData.stats.total_accounts}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Actions */}
          <div className="space-y-6">
            {/* Account Selection */}
            <Card>
              <CardHeader>
                <Wallet className="h-5 w-5" />
                Select Account
              </CardHeader>
              <CardBody>
                <select
                  className="w-full p-3 border rounded-lg mb-4"
                  value={selectedAccount}
                  onChange={handleAccountSelect}
                >
                  <option value="">Select an account...</option>
                  {accounts.map((account) => (
                    <option key={account.address} value={account.address}>
                      {account.address.slice(0, 10)}... ({account.role}) -{" "}
                      {account.eth_balance.toFixed(2)} ETH, {account.credits}{" "}
                      credits
                    </option>
                  ))}
                </select>

                {selectedAccountData && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Role:</span>
                        <Chip
                          className="ml-2"
                          color={
                            selectedAccountData.role === "owner"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {selectedAccountData.role}
                        </Chip>
                      </div>
                      <div>
                        <span className="text-gray-600">ETH Balance:</span>
                        <span className="ml-2 font-mono">
                          {selectedAccountData.eth_balance.toFixed(4)}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Credits Owned:</span>
                        <span className="ml-2 font-bold text-green-600">
                          {selectedAccountData.credits}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Buy Credits */}
            <Card>
              <CardHeader>
                <TrendingUp className="h-5 w-5" />
                Buy Credits
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <input
                    className="w-full p-3 border rounded-lg"
                    min="1"
                    placeholder="Amount to buy"
                    type="number"
                    value={buyForm.amount}
                    onChange={handleBuyFormChange}
                  />
                  {contractInfo && (
                    <div className="p-3 bg-blue-50 rounded-lg text-sm">
                      <p>
                        Cost:{" "}
                        {(
                          parseFloat(buyForm.amount) *
                          contractInfo.credit_price_eth
                        ).toFixed(4)}{" "}
                        ETH
                      </p>
                    </div>
                  )}
                  <Button
                    className="w-full"
                    disabled={loading || !selectedAccount}
                    onClick={handleBuyCredits}
                  >
                    💰 Buy Credits
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Owner Functions */}
            {ownerAccount && (
              <Card>
                <CardHeader>
                  <Settings className="h-5 w-5" />
                  Owner Functions
                </CardHeader>
                <CardBody className="space-y-4">
                  {/* Generate Credits */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Generate Credits</h4>
                    <select
                      className="w-full p-2 border rounded"
                      value={generateForm.toAddress}
                      onChange={handleGenerateFormChange("toAddress")}
                    >
                      <option value="">Select recipient...</option>
                      {accounts.map((account) => (
                        <option key={account.address} value={account.address}>
                          {account.address.slice(0, 10)}... ({account.role})
                        </option>
                      ))}
                    </select>
                    <input
                      className="w-full p-2 border rounded"
                      min="1"
                      placeholder="Amount to generate"
                      type="number"
                      value={generateForm.amount}
                      onChange={handleGenerateFormChange("amount")}
                    />
                    <Button
                      className="w-full"
                      disabled={loading}
                      onClick={handleGenerateCredits}
                    >
                      🌱 Generate Credits
                    </Button>
                  </div>

                  {/* Set Price */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Set Credit Price</h4>
                    <input
                      className="w-full p-2 border rounded"
                      placeholder="New price in ETH"
                      step="0.001"
                      type="number"
                      value={priceForm.newPrice}
                      onChange={handlePriceFormChange}
                    />
                    <Button
                      className="w-full"
                      disabled={loading}
                      onClick={handleSetPrice}
                    >
                      💲 Update Price
                    </Button>
                  </div>

                  {/* Withdraw */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Withdraw Contract Balance</h4>
                    <Button
                      className="w-full"
                      disabled={loading}
                      variant="flat"
                      onClick={handleWithdraw}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Withdraw ETH
                    </Button>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Right Column - Data Display */}
          <div className="space-y-6">
            {/* API Status */}
            <Card>
              <CardHeader>🔌 API Status</CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Frontend:</span>
                    <Chip className="ml-2" color="default" variant="faded">
                      Next.js
                    </Chip>
                  </div>
                  <div>
                    <span className="text-gray-600">API Proxy:</span>
                    <Chip className="ml-2" color="secondary" variant="faded">
                      /app/api/*
                    </Chip>
                  </div>
                  <div>
                    <span className="text-gray-600">Backend:</span>
                    <Chip className="ml-2" variant="flat">
                      Flask :5000
                    </Chip>
                  </div>
                  <div>
                    <span className="text-gray-600">Blockchain:</span>
                    <Chip className="ml-2" variant="flat">
                      Hardhat :8545
                    </Chip>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Accounts Overview */}
            <Card>
              <CardHeader>
                <Users className="h-5 w-5" />
                Accounts Overview
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {accounts.map((account, index) => (
                    <div
                      key={account.address}
                      className={`p-4 border rounded-lg transition-colors ${
                        selectedAccount === account.address
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-gray-600">
                            Account {index + 1}
                          </span>
                          <Chip
                            color={
                              account.role === "owner" ? "default" : "secondary"
                            }
                            variant="faded"
                          >
                            {account.role}
                          </Chip>
                        </div>
                        <Button
                          className="text-xs"
                          size="sm"
                          variant="ghost"
                          onPress={() => setSelectedAccount(account.address)}
                        >
                          Select
                        </Button>
                      </div>

                      <div className="text-xs text-gray-600 mb-2">
                        {account.address}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">ETH:</span>
                          <span className="ml-1 font-mono">
                            {account.eth_balance.toFixed(4)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Credits:</span>
                          <span className="ml-1 font-bold text-green-600">
                            {account.credits}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Activity Log */}
            <Card>
              <CardHeader>
                <TrendingUp className="h-5 w-5" />
                Activity Log
              </CardHeader>
              <CardBody>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {logs.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No activity yet
                    </p>
                  ) : (
                    logs.map((log, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg text-sm ${
                          log.type === "success"
                            ? "bg-green-50 border-l-4 border-green-500"
                            : log.type === "error"
                              ? "bg-red-50 border-l-4 border-red-500"
                              : "bg-blue-50 border-l-4 border-blue-500"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="flex-1">{log.message}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            {log.timestamp}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Contract Information */}
            {contractInfo && (
              <Card>
                <CardHeader>
                  <Settings className="h-5 w-5" />
                  Contract Details
                </CardHeader>
                <CardBody>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <span className="text-gray-600">Contract Address:</span>
                        <div className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">
                          {contractInfo.contract_address}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Owner Address:</span>
                        <div className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">
                          {contractInfo.owner}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-600">
                            Price per Credit:
                          </span>
                          <div className="font-bold text-green-600">
                            {contractInfo.credit_price_eth} ETH
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">
                            Contract Balance:
                          </span>
                          <div className="font-bold text-blue-600">
                            {contractInfo.contract_balance_eth.toFixed(4)} ETH
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>🌊 Blue Carbon Credits - Next.js + Flask + Hardhat Architecture</p>
          <div className="mt-1">
            <Chip className="mx-1" variant="flat">
              Frontend: /frontend/app
            </Chip>
            <Chip className="mx-1" variant="flat">
              API: /app/api/*
            </Chip>
            <Chip className="mx-1" variant="flat">
              Backend: /backend/app
            </Chip>
            <Chip className="mx-1" variant="flat">
              Blockchain: /blockchain
            </Chip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueCarbonCreditsDemo;
