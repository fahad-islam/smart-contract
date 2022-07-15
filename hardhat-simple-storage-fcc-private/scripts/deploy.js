// IMPORTS
const { ethers, run, network } = require("hardhat")
// const  = require("hardhat");

async function main() {
    // Setup Contract Factory
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    /** Deploy the contract via Contract Factory
     * */
    console.log("Deploying contract....")
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()

    // check if network is Rinkeby
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    /** let's Interact with contract
     * */
    // GET current Value
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Favorite Value is: ${currentValue}`)

    // UPDATE current Value
    const transactionResponse = await simpleStorage.store("17")
    await transactionResponse.wait(1)

    // GET updated Value
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Favorite Value is: ${updatedValue}`)

    // add New Person to the people map
    const firstPerson = await simpleStorage.addPerson("Fahad", "18")
    const secondPerson = await simpleStorage.addPerson("Islam", "18")
    console.dir({firstPerson, secondPerson})

    // GET favoriteNumber, (@param: name)! Just added above
    const person = await simpleStorage.nameToFavoriteNumber("Fahad")
    console.dir({person: { name: "Fahad", favoriteNumber: person.toString() }})
}

async function verify(contractAddress, args) {
    console.log("Verifying Contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            contructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(error)
        }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
