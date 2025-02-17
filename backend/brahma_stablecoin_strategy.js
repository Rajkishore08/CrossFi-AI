import { ethers } from "ethers";
import { SafeFactory, SafeAccountConfig } from "@safe-global/protocol-kit";
import BrahmaFi from "brahmafi-sdk"; // Import BrahmaFi SDK

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

console.log("✅ Safe Smart Account deployed at:", safe.getAddress());

// Initialize BrahmaFi SDK
const brahma = new BrahmaFi({
  apiKey: process.env.BRAHMAFI_API_KEY,
  network: "sei"
});

// Function to execute stablecoin yield strategy
async function executeStablecoinStrategy() {
  try {
    console.log("🔍 Fetching best stablecoin yield farming market...");

    // Get the best lending market for stablecoins (e.g., USDC)
    const bestMarket = await brahma.getBestLendingMarket("USDC");

    console.log("💹 Selected Market:", bestMarket);

    // Approve USDC for lending
    const approveTx = await brahma.approveToken({
      token: "USDC",
      amount: ethers.utils.parseUnits("500", 6), // Lending 500 USDC
      from: wallet.address
    });

    await approveTx.wait();
    console.log("✅ USDC Approved for Lending");

    // Execute lending transaction
    const lendTx = await brahma.lend({
      market: bestMarket,
      amount: ethers.utils.parseUnits("500", 6),
      from: safe.getAddress() // Using Safe Smart Account for security
    });

    await lendTx.wait();
    console.log("✅ Lending executed successfully!");

    // Borrow against collateral
    const borrowTx = await brahma.borrow({
      market: bestMarket,
      amount: ethers.utils.parseUnits("200", 6),
      collateral: "USDC",
      from: safe.getAddress()
    });

    await borrowTx.wait();
    console.log("✅ Borrowing executed successfully!");

    // Deposit borrowed assets into yield farm
    const farmTx = await brahma.depositYieldFarm({
      token: "USDC",
      amount: ethers.utils.parseUnits("200", 6),
      farm: "sei-yield-pool",
      from: safe.getAddress()
    });

    await farmTx.wait();
    console.log("✅ Yield Farming initiated!");

  } catch (error) {
    console.error("❌ Strategy execution failed:", error);
  }
}

// Run strategy
executeStablecoinStrategy();
