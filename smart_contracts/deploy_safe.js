// Deploys a Safe (Gnosis) smart account
const { ethers } = require("ethers");
const { SafeFactory, SafeAccountConfig } = require("@safe-global/protocol-kit");

async function deploySafe() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    const safeFactory = await SafeFactory.create({ ethAdapter: signer });
    
    const safeAccountConfig = {
        owners: [signer.address],
        threshold: 1,
    };

    const safe = await safeFactory.deploySafe({ safeAccountConfig });
    console.log("Safe deployed at:", safe.getAddress());
}

deploySafe().catch(console.error);
