// brahma_ai_executor.js
// AI-driven autonomous execution of DeFi strategies using BrahmaFi ConsoleKit

import { BrahmaConsoleKit } from "@brahmafi/consolekit";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.SEI_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const brahma = new BrahmaConsoleKit(wallet);

const STABLECOIN_ADDRESS = "0xStablecoinAddressOnSei";
const LENDING_POOL = "0xBrahmaLendingPool";
const FARM_ADDRESS = "0xYieldFarmingPool";

async function optimizePortfolio() {
    const rates = await brahma.getLendingRates(LENDING_POOL, STABLECOIN_ADDRESS);
    console.log("Current Lending APY:", rates.APY);
    
    if (rates.APY > 5) {
        const amount = ethers.parseUnits("200", 6);
        await brahma.lend(LENDING_POOL, STABLECOIN_ADDRESS, amount);
        console.log("Lent 200 USDC for optimal yield.");
    }
}

async function executeYieldFarming() {
    const stakeAmount = ethers.parseUnits("50", 6);
    const tx = await brahma.stake(FARM_ADDRESS, STABLECOIN_ADDRESS, stakeAmount);
    console.log("Yield farming executed:", tx.hash);
}

async function main() {
    await optimizePortfolio();
    await executeYieldFarming();
}

main().catch(console.error);
