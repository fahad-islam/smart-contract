require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("./tasks/block-number")
require("dotenv").config()

/** environment variables */
const {
    RINKEBY_RPC_URL,
    RINKEBY_PRIVATE_KEY,
    ETHERSCAN_API_KEY,
    COINMARKETCAP_API_KEY,
} = process.env || {
    RINKEBY_RPC_URL: "https://eth-rinkeby",
    RINKEBY_PRIVATE_KEY: "0xkey",
    ETHERSCAN_API_KEY: "key",
    COINMARKETCAP_API_KEY: "key",
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.8",
    defaultNetwork: "hardhat",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [RINKEBY_PRIVATE_KEY],
            chainId: 4,
        },
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        // currency: "USD",
        // coinmarketcap: COINMARKETCAP_API_KEY,
        // token: "MATIC",
    },
}
