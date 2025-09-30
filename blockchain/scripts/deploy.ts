import { network } from "hardhat";

async function main() {
  const { viem } = await network.connect();

  const [deployer] = await viem.getWalletClients();

  console.log("Deploying contract with account:", deployer.account.address);

  const BlueCarbonCredits = await viem.deployContract("BlueCarbonCredits");

  console.log("BlueCarbonCredits deployed to:", BlueCarbonCredits.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
