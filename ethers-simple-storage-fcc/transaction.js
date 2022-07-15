const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const providers = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, providers)

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")

    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
}

main().catch((error) => {
    console.error(error)
})
