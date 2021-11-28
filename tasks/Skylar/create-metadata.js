const fs = require('fs')
require("@nimiclabs/hardhat-web3")

task("create-metadata", "Create metadata for all collectibles created by Chainlink SC")
    .addParam("contract", "The address of the VRF contract that you want to read")
    .setAction(async taskArgs => {

        const contractAddr = taskArgs.contract
        const networkId = network.name
        console.log("Reading data from VRF contract ", contractAddr, " on network ", networkId)
        const RandomNumberConsumer = await ethers.getContractFactory("RandomNumberConsumer")

        //Get signer information
        const accounts = await hre.ethers.getSigners()
        const signer = accounts[0]

        const metadataTemplate = {
            "name": "",
            "description": "",
            "image": "",
            "attribute": [
                {

                    "item_type": "alchemistJournal",
                    "value": 0
                },
                {

                    "item_type": "magnifier",
                    "value": 0
                },
                {

                    "item_type": "bacterium",
                    "value": 0
                },
                {

                    "item_type": "secondChance",
                    "value": 0
                },
                {

                    "item_type": "goldenPen",
                    "value": 0
                },
                {

                    "item_type": "alcohol",
                    "value": 0
                },
                {

                    "item_type": "badge",
                    "value": 0
                }

            ]

        }

        const Skylar = await ethers.getContractAt("SkylarCollectibles")
        length = await Skylar.getNumberOfCharacters()
        index = 0

        while(index < length){
            let collectibleMetadata = metadataTemplate
            let collectibleOverview = await Skylar.getNumberOfCharacters
            index++

            collectibleMetadata ['name'] = collectibleOverview = ['name']

            if(fs.existsSync('metadata/' +  collectibleMetadata ['name']).toLowerCase().replace(/\s/g, '-')){
                console.log('test')
                continue
            }
            console.log(collectibleMetadata ['name'])
            console.log(collectibleOverview ['alchemistJournal'].toNumber())
            collectibleMetadata ['attributes'] [0] ['value'] = collectibleOverview ['problemSolving'].toNumber()
            collectibleMetadata ['attributes'] [1] ['value'] = collectibleOverview ['conceptualization'].toNumber()
            collectibleMetadata ['attributes'] [2] ['value'] = collectibleOverview ['creativity'].toNumber()
            collectibleMetadata ['attributes'] [3] ['value'] = collectibleOverview ['criticaThinking'].toNumber()
            collectibleMetadata ['attributes'] [4] ['value'] = collectibleOverview ['empathy'].toNumber()
            collectibleMetadata ['attributes'] [5] ['value'] = collectibleOverview ['flexibility'].toNumber()
            collectibleMetadata ['attributes'] [5] ['value'] = collectibleOverview ['grit'].toNumber()
            filename = 'metadata/' +  collectibleMetadata ['name'].toLowerCase().replace(/\s/g, '-')
            let data = JSON.stringify(collectibleMetadata)
            fs.writeFileSync(filename + '.mjs', data)



        }
       
    })

module.exports = {}