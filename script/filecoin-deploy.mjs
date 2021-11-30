import { NFTStorage, File } from 'nft.storage'

const  apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXrVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcxZDg5YUNhZTZjNmQ5MmVBOGFBOTU3M0MwQTdENTIzRjE2QzgxODMiLCJpc3MiOiJuZnQtc3vcmFnZSIsImlhdCI6MTYzODExNTIzNDk0NiwibmFtZSI6IlNreWxhciJ9.eymS5oAvzs70A5iPIRTJjw1EqFiwtN-67RPNlv3MnjY';

async function main(){
    const client = new NFTStorage ({token: apikey})

    const metadata = await client.store(emeka);
    console.log(metadata.url);
}

main();
