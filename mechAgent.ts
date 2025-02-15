import { MechMarketplaceSDK } from "@mech/sdk";
import { ethers } from "ethers";

// Initialize provider and signer
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Initialize Mech Marketplace SDK
const mech = new MechMarketplaceSDK({
  apiKey: process.env.MECH_API_KEY,
  signer: wallet,
});

async function registerAgent() {
  try {
    const agentDetails = {
      name: "CeloFX Trading Agent",
      description: "An automated forex trading agent powered by AI and Safe Smart Accounts.",
      capabilities: ["DeFi Strategy Execution", "Automated Trading", "Risk Management"],
      endpoint: process.env.AGENT_ENDPOINT,
    };

    const response = await mech.registerAgent(agentDetails);
    console.log("Agent registered successfully:", response);
  } catch (error) {
    console.error("Error registering agent:", error);
  }
}

registerAgent();
