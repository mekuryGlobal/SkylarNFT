const { hrtime } = require("process")

task("generate collectible","Generate a provably random chainlink SC", contractAddr)
.addParam("contract", "The address of the contract you want")
.addParam("name", "The name of the collectible")
.setAction(async taskArgs => {
 
  const contractAddr = taskArgs.contract
  const networkId = network.name
  const Skylar = await ethers.getContractFactory("SkylarCollectibles")
 
  const accounts = await hre.ethers.getSigners()
  const singers = accounts[0]
 
 
  const skylarContract = new ethers.Contract(contractAddr, Skylar.interface,singer)
  const transactionResponse = await skylarContract.requestNewRandpmCollectible(taskArgs.name)
  const transactionReceipt = await transacttionResponse.wait()
 
  const chainId = await getChainId
 
})

module.exports = {}
