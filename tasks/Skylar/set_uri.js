task("set URI", "set URI of an NFT")
.addparam("contract", "The address of the contract you want")
.addParam("tokenId", "The address")
.addParam("URI", "URI of the NFT")

.setAction(async taskArgs =>{
const contractAddr = taskArgs.contract
  const networkId = network.name
  const Skylar = await ethers.getContractFactory("SkylarCollectibles")

  const accounts = await hre.ethers.getSigners()
  const singers = accounts[0]

  const skylarContract = new ethers.Contract(contractAddr, Skylar.interface,singer)
  var result = await skylarContract.setTokenURI()
})

module.exports = {}