let {networkConfig} = require('C:/Users/PatMekury/Documents/SkylarNFT/helper-hardhat-config')

module.exports = async({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const {deploy, get, log} = deployments
    const {deployer} = await getNamedAccounts()
    const chainId = await getChainId()
    let linkTokenAddress
    let vrfCoordinatorAddress 
    let theUsdPreceFeddAddress
    let additionalMessage = ""

    if(chainId == 31337){
        linkToken = await get('LinkToken')
        vrfCoordinatorMock = await get('vrfCoordinatorMock')
        linkTokenAddress = LinkedToken.address 
        vrfCoordinatorAddress = vrfCoordinatorMock.address
        additionalMessage = "--linkaddress " + linkTokenAddress
        const EthUsdAggregator = await deployments.get('EthUsdAggregator')
        EthUsdPriceFeedAddress = EthUsdAggregator.address
    } else{
        linkTokenAddress = networkConfig[chainId]['linkToken']
        vrfCoordinatorAddress = networkConfig[chainId]['vrfCoordinator']
        EthUsdPriceFeedAddress = networkConfig[chainId]['EthUsdPriceFeed']
     }
     const keyHash = networkConfig[chainId]['keyHash']
     const fee = networkConfig[chainId]['fee']

     const skylar = await deploy ('SkylarCollectibles',{
     from: deployer,
     args: [vrfCoordinatorAddress, linkTokenAddress, keyHash, EthUsdPriceFeedAddress],
     log: true
})
     log("Run the following command to fund contract with LINK:")
     log("npx hardhat fund-link --contract  " + skylar.address + " --network " + networkConfig[chainId]['name'] )
     log("To generate a character run the following")
     log("npx hardhat generate-character --contract" + skylar.address +  " --name InsertName " + " -")
     log ("To get a character's details as metadata run the following:")
     log("npx hardhat generate-character --contract" + skylar.address +  " --network " +  networkConfig[chainId]['name'] )
     log("------------------------------------------------------------ " )
}

module.exports.tags = ['all', 'D&D']