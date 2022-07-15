const ethers = require("ethers")
const fs = require("fs-extra")
// const solcjs = require("solc-js");
require("dotenv").config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)

    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8")

    let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD)

    wallet = await wallet.connect(provider)

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")

    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)

    console.log("Deploying, please wait...")

    // Deploy the contract
    const contract = await contractFactory.deploy()

    // for connecting previously deployed contract
    // const contract = new ethers.ContractFactory.getContract(
    //     "0xF9B3d7715C99308685a5b1d2436C28783bBfcFa1",
    //     abi,
    //     wallet
    // )

    // console.dir({ contract }, { depth: Infinity })

    // assign a favorite number to contract
    // await contract.store(786)

    // reterive favorite Number from contract
    // let favoriteNumber = (await contract.retrieve()).toString()

    const transactionReceipt = await contract.deployTransaction.wait(1)

    console.dir({ contract_address: contract.address })

    // console.dir({ favoriteNumber }, { depth: Infinity })

    // add new person
    // await contract.addPerson("Fahad","10")

    // let error, [ _favoriteNumber, _name ] = await  contract.people("1")

    // console.dir({error}, {depth: Infinity})

    // console.dir({_favoriteNumber, _name}, {depth: Infinity})

    /**
     * SAVE IT!
     * console.log(contract.deployTransaction)
     * console.log(transactionReceipt)
     * */

    // const tx = {
    //     nonce: await wallet.getTransactionCount(),
    //     gasPrice: 20000000000,
    //     gasLimit: 463682,
    //     to: null,
    //     value: 0,
    //     data: `0x${binary}`,
    //     chainId: 1337,
    // }

    // const sendTxResponse = await wallet.sendTransaction(tx)
    // const transactionReceipt = await (await sendTxResponse()).wait(1)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error cause disruption!", error)
        process.exit(1)
    })
