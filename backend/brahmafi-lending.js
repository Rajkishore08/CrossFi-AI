import { ethers } from "ethers";
import { SafeFactory, SafeAccountConfig } from "@safe-global/protocol-kit";
import BrahmaFi from "brahmafi-sdk"; // Importing BrahmaFi SDK

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Blockchain & BrahmaFi setup
const provider = new ethers.providers.JsonRpcProvider(process.env.SEI_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Initialize Safe Smart Account
const safeFactory = await SafeFactory.create({ ethAdapter: wallet });
const safeConfig = new SafeAccountConfig({ owners: [wallet.address], threshold: 1 });
const safe = await safeFactory.deploySafe(safeConfig);

console.log("Safe Smart Account deployed at:", safe.getAddress());

// Initialize BrahmaFi SDK
const brahma = new BrahmaFi({
  apiKey: process.env.BRAHMAFI_API_KEY,
  network: "sei"
});

// Function to execute lending strategy
async function executeLendingStrategy() {
  try {
    // Select stablecoin market with best APY
    const market = await brahma.getBestLendingMarket("USDC");

    console.log("Selected Lending Market:", market);

    // Approve USDC for lending
    const approveTx = await brahma.approveToken({
      token: "USDC",
      amount: ethers.utils.parseUnits("1000", 6), // Lending 1000 USDC
      from: wallet.address
    });

    await approveTx.wait();
    console.log("USDC Approved for Lending");

    // Execute lending transaction
    const lendTx = await brahma.lend({
      market,
      amount: ethers.utils.parseUnits("1000", 6),
      from: safe.getAddress() // Using Safe Smart Account for security
    });

    await lendTx.wait();
    console.log("Lending executed successfully!");

  } catch (error) {
    console.error("Lending strategy execution failed:", error);
  }
}

// Run strategy
executeLendingStrategy();
