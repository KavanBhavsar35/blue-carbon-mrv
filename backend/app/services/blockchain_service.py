# File: backend\app\blockchain.py
from flask import Blueprint, request, jsonify
from web3 import Web3
import json
import os

# Create Blueprint instead of Flask app
bp = Blueprint('blockchain', __name__, url_prefix='/blockchain')

# Configuration
CONTRACT_ADDRESS = Web3.to_checksum_address("0x5fbdb2315678afecb367f032d93f642f64180aa3")
NODE_URL = "http://127.0.0.1:8545"

# Hardhat default accounts (FIXED - added missing 0x prefixes)
ACCOUNTS = [
    {
        "address": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        "private_key": "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        "role": "owner"
    },
    {
        "address": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "private_key": "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
        "role": "buyer"
    },
    {
        "address": "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
        "private_key": "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
        "role": "buyer"
    },
    {
        "address": "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
        "private_key": "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
        "role": "buyer"
    },
    {
        "address": "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
        "private_key": "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a",
        "role": "buyer"
    },
    {
        "address": "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
        "private_key": "0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba",
        "role": "buyer"
    },
    {
        "address": "0x976ea74026e726554db657fa54763abd0c3a0aa9",
        "private_key": "0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e",
        "role": "buyer"
    },
    {
        "address": "0x14dc79964da2c08b23698b3d3cc7ca32193d9955",
        "private_key": "0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356",
        "role": "buyer"
    },
    {
        "address": "0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f",
        "private_key": "0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97",
        "role": "buyer"
    },
    {
        "address": "0xa0ee7a142d267c1f36714e4a8f75612f20a79720",
        "private_key": "0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6",
        "role": "buyer"
    },
    # FIXED: Added 0x prefix to remaining addresses
    {
        "address": "0xbcd4042de499d14e55001ccbb24a551f3b954096",
        "private_key": "0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897",
        "role": "buyer"
    },
    {
        "address": "0x71be63f3384f5fb98995898a86b02fb2426c5788",
        "private_key": "0x701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82",
        "role": "buyer"
    },
    {
        "address": "0xfabb0ac9d68b0b445fb7357272ff202c5651694a",
        "private_key": "0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1",
        "role": "buyer"
    },
    {
        "address": "0x1cbd3b2770909d4e10f157cabc84c7264073c9ec",
        "private_key": "0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd",
        "role": "buyer"
    },
    {
        "address": "0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097",
        "private_key": "0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa",
        "role": "buyer"
    },
    {
        "address": "0xcd3b766ccdd6ae721141f452c550ca635964ce71",
        "private_key": "0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61",
        "role": "buyer"
    },
    {
        "address": "0x2546bcd3c84621e976d8185a91a922ae77ecec30",
        "private_key": "0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0",
        "role": "buyer"
    },
    {
        "address": "0xbda5747bfd65f08deb54cb465eb87d40e51b197e",
        "private_key": "0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd",
        "role": "buyer"
    },
    {
        "address": "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
        "private_key": "0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0",
        "role": "buyer"
    },
    {
        "address": "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
        "private_key": "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
        "role": "buyer"
    }
]

# Initialize Web3 and contract variables
w3 = None
contract = None
contract_address = None

def initialize_blockchain_connection():
    """Initialize Web3 connection and contract"""
    global w3, contract, contract_address
    
    try:
        # Web3 setup
        w3 = Web3(Web3.HTTPProvider(NODE_URL))
        
        if not w3.is_connected():
            print("❌ Failed to connect to Hardhat node")
            return False
        
        contract_address = Web3.to_checksum_address(CONTRACT_ADDRESS)
        
        # Load contract ABI
        abi_file_path = "../contracts/BlueCarbonCredits.json"
        if os.path.exists(abi_file_path):
            with open(abi_file_path) as f:
                contract_json = json.load(f)
                abi = contract_json["abi"]
            print("✅ ABI loaded from file")
        else:
            print("⚠️ ABI file not found, using fallback ABI")
            # Fallback ABI - you should replace this with your actual contract ABI
            abi = [
                {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
                {"anonymous":False,"inputs":[{"indexed":True,"internalType":"address","name":"to","type":"address"},{"indexed":False,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"CreditsGenerated","type":"event"},
                {"anonymous":False,"inputs":[{"indexed":True,"internalType":"address","name":"buyer","type":"address"},{"indexed":False,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":False,"internalType":"uint256","name":"totalPaid","type":"uint256"}],"name":"CreditsPurchased","type":"event"},
                {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
                {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyCredits","outputs":[],"stateMutability":"payable","type":"function"},
                {"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"checkCredits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
                {"inputs":[],"name":"creditPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
                {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"generateCredits","outputs":[],"stateMutability":"nonpayable","type":"function"},
                {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
                {"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},
                {"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}
            ]
        
        # Create contract instance
        contract = w3.eth.contract(address=contract_address, abi=abi)
        
        # Test contract deployment by checking if code exists
        code = w3.eth.get_code(contract_address)
        if code == b'':
            print("❌ No contract deployed at address:", contract_address)
            return False
        
        print("✅ Connected to blockchain")
        print(f"   Chain ID: {w3.eth.chain_id}")
        print(f"   Contract Address: {contract_address}")
        print(f"   Contract Code Length: {len(code)} bytes")
        
        # Test a simple contract call
        try:
            owner = contract.functions.owner().call()
            print(f"   Contract Owner: {owner}")
        except Exception as e:
            print(f"⚠️ Warning: Could not call owner() function: {e}")
        
        return True
        
    except Exception as e:
        print(f"❌ Blockchain initialization error: {e}")
        return False

def get_account_by_address(address):
    """Get account info by address"""
    return next((acc for acc in ACCOUNTS if acc["address"].lower() == address.lower()), None)

def execute_transaction(function_call, from_address, value=0):
    """Execute a blockchain transaction with better error handling"""
    if not w3 or not contract:
        raise Exception("Blockchain not initialized")
    
    account = get_account_by_address(from_address)
    if not account:
        raise Exception(f"Account not found: {from_address}")
    
    try:
        # Get current nonce
        nonce = w3.eth.get_transaction_count(from_address)
        
        # Build transaction
        txn = function_call.build_transaction({
            "from": from_address,
            "value": value,
            "nonce": nonce,
            "gas": 2000000,
            "gasPrice": w3.to_wei("20", "gwei"),  # Increased gas price
        })
        
        # Sign and send transaction
        signed_txn = w3.eth.account.sign_transaction(txn, private_key=account["private_key"])
        tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
        
        # Wait for transaction receipt
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        
        if receipt.status == 0:
            raise Exception("Transaction failed")
        
        return receipt
        
    except Exception as e:
        print(f"Transaction error: {e}")
        raise

# Blueprint routes (changed from @app.route to @bp.route)
# Add debug route to check what's happening
@bp.route("/info", methods=["GET"])
def blockchain_info():
    """Get blockchain information"""
    if not w3:
        return jsonify({"error": "Not connected"}), 503
    
    try:
        latest_block = w3.eth.get_block('latest')
        return jsonify({
            "chain_id": w3.eth.chain_id,
            "latest_block_number": latest_block.number,
            "latest_block_hash": latest_block.hash.hex(),
            "gas_price": w3.eth.gas_price,
            "accounts_count": len(w3.eth.accounts) if hasattr(w3.eth, 'accounts') else 20
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@bp.route("/", methods=["GET"])
def blockchain_index():
    """Debug route to see what's happening"""
    return jsonify({
        "message": "Blockchain API is running",
        "available_endpoints": [
            "/blockchain/health",
            "/blockchain/accounts", 
            "/blockchain/contract-info",
            "/blockchain/generate-credits",
            "/blockchain/buy-credits",
            "/blockchain/check-credits/<address>",
            "/blockchain/set-price",
            "/blockchain/withdraw",
            "/blockchain/dashboard-data"
        ]
    })

@bp.route("/health", methods=["GET"])
def health_check():
    """Check if the service is healthy"""
    if not w3 or not contract:
        return jsonify({
            "status": "unhealthy",
            "message": "Blockchain connection not initialized"
        }), 503
    
    try:
        is_connected = w3.is_connected()
        chain_id = w3.eth.chain_id if is_connected else None
        
        return jsonify({
            "status": "healthy" if is_connected else "unhealthy",
            "connected": is_connected,
            "chain_id": chain_id,
            "contract_address": contract_address
        })
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "message": str(e)
        }), 503

@bp.route("/accounts", methods=["GET"])
def get_accounts():
    """Get all available accounts with their ETH balances"""
    if not w3 or not contract:
        return jsonify({"status": "error", "message": "Blockchain not connected"}), 503
    
    try:
        accounts_with_balance = []
        for account in ACCOUNTS:
            checksum_address = Web3.to_checksum_address(account["address"])
            balance_wei = w3.eth.get_balance(checksum_address)
            balance_eth = w3.from_wei(balance_wei, 'ether')
            
            # Try to get credits, with fallback
            try:
                credits = contract.functions.checkCredits(checksum_address).call()
            except:
                credits = 0
            
            accounts_with_balance.append({
                "address": checksum_address,
                "role": account["role"],
                "eth_balance": float(balance_eth),
                "credits": credits
            })
        
        return jsonify({"accounts": accounts_with_balance})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@bp.route("/contract-info", methods=["GET"])
def contract_info():
    """Get contract information"""
    if not w3 or not contract:
        return jsonify({"status": "error", "message": "Blockchain not connected"}), 503
    
    try:
        owner = contract.functions.owner().call()
        price_wei = contract.functions.creditPrice().call()
        price_eth = w3.from_wei(price_wei, 'ether')
        contract_balance_wei = w3.eth.get_balance(contract_address)
        contract_balance_eth = w3.from_wei(contract_balance_wei, 'ether')
        
        return jsonify({
            "contract_address": contract_address,
            "owner": owner,
            "credit_price_wei": price_wei,
            "credit_price_eth": float(price_eth),
            "contract_balance_eth": float(contract_balance_eth)
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@bp.route("/generate-credits", methods=["POST"])
def generate_credits():
    """Generate credits (owner only)"""
    if not w3 or not contract:
        return jsonify({"status": "error", "message": "Blockchain not connected"}), 503
    
    data = request.json
    to_address = data.get("to_address")
    amount = data.get("amount", 0)
    from_address = data.get("from_address", ACCOUNTS[0]["address"])  # Default to owner
    
    if not to_address:
        return jsonify({"status": "error", "message": "to_address required"}), 400
    
    try:
        to_address = Web3.to_checksum_address(to_address)
        from_address = Web3.to_checksum_address(from_address)
        
        receipt = execute_transaction(
            contract.functions.generateCredits(to_address, amount),
            from_address
        )
        
        return jsonify({
            "status": "success",
            "txHash": receipt.transactionHash.hex(),
            "generated_to": to_address,
            "amount": amount
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@bp.route("/buy-credits", methods=["POST"])
def buy_credits():
    """Buy credits"""
    if not w3 or not contract:
        return jsonify({"status": "error", "message": "Blockchain not connected"}), 503
    
    data = request.json
    amount = data.get("amount", 1)
    from_address = data.get("from_address")
    
    if not from_address:
        return jsonify({"status": "error", "message": "from_address required"}), 400
    
    try:
        from_address = Web3.to_checksum_address(from_address)
        credit_price = contract.functions.creditPrice().call()
        total_cost = credit_price * amount
        
        receipt = execute_transaction(
            contract.functions.buyCredits(amount),
            from_address,
            value=total_cost
        )
        
        return jsonify({
            "status": "success",
            "txHash": receipt.transactionHash.hex(),
            "amount": amount,
            "total_cost_wei": total_cost,
            "total_cost_eth": float(w3.from_wei(total_cost, 'ether'))
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@bp.route("/check-credits/<address>", methods=["GET"])
def check_credits(address):
    """Check credits for an address"""
    if not w3 or not contract:
        return jsonify({"status": "error", "message": "Blockchain not connected"}), 503
    
    try:
        address = Web3.to_checksum_address(address)
        credits = contract.functions.checkCredits(address).call()
        return jsonify({"address": address, "credits": credits})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@bp.route("/set-price", methods=["POST"])
def set_price():
    """Set credit price (owner only)"""
    if not w3 or not contract:
        return jsonify({"status": "error", "message": "Blockchain not connected"}), 503
    
    data = request.json
    new_price_eth = data.get("price_eth")
    from_address = data.get("from_address", ACCOUNTS[0]["address"])
    
    if new_price_eth is None:
        return jsonify({"status": "error", "message": "price_eth required"}), 400
    
    try:
        from_address = Web3.to_checksum_address(from_address)
        new_price_wei = w3.to_wei(new_price_eth, 'ether')
        
        receipt = execute_transaction(
            contract.functions.setPrice(new_price_wei),
            from_address
        )
        
        return jsonify({
            "status": "success",
            "txHash": receipt.transactionHash.hex(),
            "new_price_eth": new_price_eth,
            "new_price_wei": new_price_wei
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@bp.route("/withdraw", methods=["POST"])
def withdraw():
    """Withdraw contract balance (owner only)"""
    if not w3 or not contract:
        return jsonify({"status": "error", "message": "Blockchain not connected"}), 503
    
    data = request.json
    from_address = data.get("from_address", ACCOUNTS[0]["address"])
    
    try:
        from_address = Web3.to_checksum_address(from_address)
        
        receipt = execute_transaction(
            contract.functions.withdraw(),
            from_address
        )
        
        return jsonify({
            "status": "success",
            "txHash": receipt.transactionHash.hex()
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@bp.route("/dashboard-data", methods=["GET"])
def dashboard_data():
    """Get comprehensive dashboard data"""
    if not w3 or not contract:
        return jsonify({"status": "error", "message": "Blockchain not connected"}), 503
    
    try:
        # Contract info
        owner = contract.functions.owner().call()
        price_wei = contract.functions.creditPrice().call()
        price_eth = w3.from_wei(price_wei, 'ether')
        contract_balance_wei = w3.eth.get_balance(contract_address)
        contract_balance_eth = w3.from_wei(contract_balance_wei, 'ether')
        
        # Account info
        accounts_data = []
        total_credits = 0
        
        for account in ACCOUNTS:
            checksum_address = Web3.to_checksum_address(account["address"])
            balance_wei = w3.eth.get_balance(checksum_address)
            balance_eth = w3.from_wei(balance_wei, 'ether')
            
            try:
                credits = contract.functions.checkCredits(checksum_address).call()
            except:
                credits = 0
            
            total_credits += credits
            
            accounts_data.append({
                "address": checksum_address,
                "role": account["role"],
                "eth_balance": float(balance_eth),
                "credits": credits
            })
        
        return jsonify({
            "contract": {
                "address": contract_address,
                "owner": owner,
                "credit_price_eth": float(price_eth),
                "balance_eth": float(contract_balance_eth)
            },
            "accounts": accounts_data,
            "stats": {
                "total_credits_issued": total_credits,
                "total_accounts": len(ACCOUNTS)
            }
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    
    
@bp.route("/blocks", methods=["GET"])
def get_all_blocks():
    """Get all blocks in order"""
    if not w3:
        return jsonify({"error": "Not connected"}), 503
    
    try:
        latest_block = w3.eth.get_block('latest')
        blocks = []
        
        # Get last 20 blocks for performance
        for i in range(max(0, latest_block.number - 19), latest_block.number + 1):
            block = w3.eth.get_block(i)
            blocks.append({
                "number": block.number,
                "hash": block.hash.hex(),
                "timestamp": block.timestamp,
                "transactions": [tx.hex() for tx in block.transactions],
                "gasUsed": block.gasUsed,
                "gasLimit": block.gasLimit
            })
        
        return jsonify({"blocks": blocks})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@bp.route("/transactions", methods=["GET"])
def get_all_transactions():
    """Get all transactions in order"""
    if not w3:
        return jsonify({"error": "Not connected"}), 503
    
    try:
        latest_block = w3.eth.get_block('latest')
        transactions = []
        
        # Get transactions from last 20 blocks
        for i in range(max(0, latest_block.number - 19), latest_block.number + 1):
            block = w3.eth.get_block(i, full_transactions=True)
            for tx in block.transactions:
                transactions.append({
                    "hash": tx.hash.hex(),
                    "from": tx.get('from', ''),
                    "to": tx.get('to', ''),
                    "value": str(tx.value),
                    "gas": tx.gas,
                    "gasPrice": str(tx.gasPrice),
                    "blockNumber": tx.blockNumber,
                    "timestamp": block.timestamp
                })
        
        # Sort by block number and transaction index
        transactions.sort(key=lambda x: (x['blockNumber'], x['hash']))
        return jsonify({"transactions": transactions[-50:]})  # Return last 50 transactions
    except Exception as e:
        return jsonify({"error": str(e)}), 400