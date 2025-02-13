from web3 import Web3
import lit_sdk  # Hypothetical Lit SDK for encryption

INFURA_URL = "https://mainnet.infura.io/v3/YOUR_INFURA_KEY"
SAFE_CONTRACT = "0xYourSafeWalletAddress"

web3 = Web3(Web3.HTTPProvider(INFURA_URL))

def execute_safe_transaction():
    tx = {
        'to': SAFE_CONTRACT,
        'value': web3.toWei(0.1, 'ether'),
        'gas': 21000,
        'gasPrice': web3.toWei('50', 'gwei')
    }
    signed_tx = web3.eth.account.sign_transaction(tx, private_key="YOUR_PRIVATE_KEY")
    tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
    return web3.toHex(tx_hash)

def encrypt_transaction():
    encrypted_data = lit_sdk.encrypt("Transaction data")
    return encrypted_data

print(execute_safe_transaction())
print(encrypt_transaction())

