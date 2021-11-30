import fs from 'fs'
import {file} from 'nft-storage'

const Onyebuchi = {
    name: "Onyebuchi",
    description: "rare books that gives tips on the current mission",
    image: new file([await fs.promises.readfile('/Users/PatMekury/Documents/SkylarNFT/images/Onyebuchi')], 'Onyebuchi',
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

export default Onyebuchi;
