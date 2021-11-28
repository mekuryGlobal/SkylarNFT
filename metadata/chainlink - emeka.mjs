import fs from 'fs'
import {file} from 'nft-storage'

const alchemistJournal = {
    name: "chainlink emeka",
    description: "rare books that gives tips on the current mission",
    image: new file([await fs.promises.readfile('/Users/PatMekury/Documents/SkylarNFT/images/chainlink_alchemistJournal')], 'chainlink_alchemistJournal',
        {type:' image/png'}
   ),

   attributes: [
       {trait_type: "", value: 40},
       {trait_type: "", value: 26},
       {trait_type: "", value: 76},
       {trait_type: "", value: 18},
       {trait_type: "", value: 24},
       {trait_type: "", value: 19},
       {trait_type: "", value: 0}
   ]

};

export default emeka;