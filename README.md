# 🚀 **CrossFi AI - Safe Smart Accounts & Automated Trading**

## **Overview**
CrossFi AI is an advanced automation tool leveraging Safe (Gnosis) smart accounts, CoW Protocol, and Polymarket for seamless decentralized trading. The project also includes AI-powered meme generation for community engagement.

## **Features**
- 🔐 **Safe (Gnosis) Smart Accounts** – Deploy and manage smart contract wallets efficiently.
- 🤖 **Automated Trading with CoW Protocol** – Secure, gas-efficient order execution.
- 📊 **Polymarket Betting** – Automated decision-making for prediction markets.
- 🎨 **AI Meme Generation** – Generate and distribute viral crypto memes.

---

## **Bounty Eligibility**
✅ **Safe (Gnosis) Smart Accounts** – Secure wallet automation  
✅ **CoW Protocol Automation** – Efficient trade execution  
✅ **Polymarket Betting Strategy** – Market-based trading automation  
✅ **Meme Generation** – AI-driven crypto engagement  



---

## **Setup Instructions**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Rajkishore08/CrossFi-AI
cd CrossFi-AI
```
### **2️⃣ Install Dependencies**
```sh
npm install
```
### **3️⃣ Environment Variables**
Create a .env file with the following details:
```sh
PRIVATE_KEY=your_wallet_private_key
SAFE_ADDRESS=your_safe_smart_account
COW_API_KEY=your_cow_protocol_api_key
POLYMARKET_API_KEY=your_polymarket_api_key
```
### **4️⃣ Deploy Safe (Gnosis) Smart Account**
```sh
node backend/deploy-safe.js
```
### **5️⃣ Automate CoW Protocol Trading**
```sh
node backend/cow-trading.js
```
### **6️⃣ Automate Polymarket Predictions**
```sh
node backend/polymarket.js
```
### **7️⃣ Generate Crypto Memes**
```sh
python backend/meme-generator.py
```
### **File Structure**
```bash
📂 CrossFi-AI
 ├── 📂 backend
 │   ├── deploy-safe.js      # Deploys Safe (Gnosis) smart account
 │   ├── cow-trading.js      # Automates CoW Protocol trades
 │   ├── polymarket.js       # Automates Polymarket betting
 │   ├── meme-generator.py   # AI-powered meme creation
 ├── 📂 config
 │   ├── safe-config.json    # Config for Safe deployment
 │   ├── cow-config.json     # CoW Protocol settings
 │   ├── polymarket-config.json # Polymarket settings
 ├── 📂 smart_contracts/deploy_safe.js
 ├── .env                    # Environment variables
 ├── package.json            # Project dependencies
 ├── README.md               # Project documentation
```
## **Tech Stack**

**Blockchain:** Safe (Gnosis), CoW Protocol, Polymarket

**Backend:** Node.js, Python

**AI & ML:** OpenAI API (for memes)

**Security:** Web3.js, ethers.js

## **Future Enhancements**

✅ Integrate Chainlink for real-time price feeds

✅ Improve meme AI model for contextual accuracy

✅ Enable Telegram/Discord bot for trade notifications
