import { SafeFactory, EthersAdapter } from "@safe-global/protocol-kit";
import { DuckAI } from "@duck-ai/sdk";
import { ethers } from "ethers";

// Setup provider and signer
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer });

// Initialize Safe Smart Account
async function setupSafe() {
  const safeFactory = await SafeFactory.create({ ethAdapter });
  const safeAccount = await safeFactory.deploySafe({ owners: [await signer.getAddress()], threshold: 1 });
  console.log("Safe Smart Account deployed:", safeAccount.getAddress());
  return safeAccount;
}

// Initialize DuckAI Agent
async function setupDuckAI(safeAccount: any) {
  const duckAi = new DuckAI({ apiKey: process.env.DUCKAI_API_KEY });

  const agentConfig = {
    name: "CeloFX AI Trading Agent",
    safeAddress: safeAccount.getAddress(),
    strategy: "Automated Forex Trading",
  };

  const agent = await duckAi.createAgent(agentConfig);
  console.log("DuckAI Agent Created:", agent);
}

async function main() {
  const safeAccount = await setupSafe();
  await setupDuckAI(safeAccount);
}

main().catch(console.error);
