const { assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", function () {
    
    let simpleStorageFactory, simpleStorage
    
    // Starter Pack for Testing!
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory(
            "SimpleStorage"
        )
        simpleStorage = await simpleStorageFactory.deploy()
    })

    // At start favoriteNumber = 0
    it("Should start with a favorite number of 0", async () => {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })

    // Update on store call
    it("Should update favorite number on store call", async () => {
        const expectedValue = "10"
        await (await simpleStorage.store(expectedValue)).wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue, expectedValue)
    })

    // Add new Person in People[]
    it("Should add new person in people array", async () => {
        const expectedValue = {
            name: "Fahad Islam",
            favoriteNumber: "0"
        }
        await simpleStorage.addPerson(expectedValue.name, expectedValue.favoriteNumber)
        const favoriteNumber = await simpleStorage.nameToFavoriteNumber(expectedValue.name)
        assert.equal(favoriteNumber.toString(), expectedValue.favoriteNumber)
    })
})
