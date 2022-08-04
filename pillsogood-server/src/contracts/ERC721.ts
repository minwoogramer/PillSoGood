import { ethers } from "ethers"
import { abi } from "./abi"
import dotenv from "dotenv";
dotenv.config();

declare let process : {
    env : {
      InfuraAPIkey : string;
      PrivateKey : string;
    }} 
  

const provider = new ethers.providers.InfuraProvider('rinkeby', process.env.InfuraAPIkey)       // provider는 read-only, signer는 write-only 
const server_rinkeby_address = "0xce23876bFB968F49f7535A55634F463876427fd5"                     // NFT 발급해주는 서버의 rinkeby 메타마스크 account address 
const signer = new ethers.Wallet(process.env.PrivateKey, provider)                              // privateKey는 MetaMask privateKey
const Deployed_Contract_address = "0x811a2a73f54179ea3f73a73aacca0b1863bf97bd"                  // Deploy_account_address = "0xce23876bfb968f49f7535a55634f463876427fd5"


//ERC-721 발행
export async function ERC721Mint( tokenuri : string ){    // tokenuri 인자 받아야 함
    
    const contract = new ethers.Contract(Deployed_Contract_address, abi, signer)
    const tokenURI = tokenuri //   example) "ipfs://QmSvc6g6er5ZeWiu2YBHznxxsZ7FJV2xEdcDNKp4Sw17dk"
    
    const Mint = async () => {
        const mint = await contract.mintNFT(server_rinkeby_address, tokenURI)  // Deploy한 smartContract의 mintNFT함수 실행 
                     await provider.waitForTransaction(mint.hash)              // transaction 완성되기 전까지 다음 script 읽는 것 wait                                
        const receipt = await provider.getTransactionReceipt(mint.hash)        // tokenId 추출 위해 트랜잭션값 조회
        const hash = mint.hash                                                 // return의 해쉬값 추출 위해 hash 선언
     
        const tokenId_hex = receipt.logs[0].topics[3]                          // 트랜잭션조회한 결과에서 tokenId hex값 추출
        const tokenId_hex_to_Number = parseInt(tokenId_hex, 16)                // 16진수의 tokenId hex값을 10진수로 변환
       
        console.log(mint)
        console.log(`NFT Minted! Check it out at: https://rinkeby.etherscan.io/tx/${mint.hash}`)
        console.log(`It's tokenId is ${tokenId_hex_to_Number}`)                 // tokenId, mint.hash는 DB에 저장해놨다가 프론트쪽에서 가져가야됨 
        
        return Array(hash, tokenId_hex_to_Number)
    }

    try { return Mint() }
    catch (e) { console.error(e)}
}


//ERC-721 전송
export async function ERC721transfer( recieveraddr : string, tokenid : string ) {    // receiverAddress, tokenId 받아와야 함

    const contract = new ethers.Contract(Deployed_Contract_address, abi, signer)
    const receiverAddress = recieveraddr
    const tokenId = tokenid

    const Transfer = async() => {
        const transfer = await contract.transferFrom(server_rinkeby_address, receiverAddress, tokenId)
        console.log(transfer)
        console.log(`Transfer Succeeded. Check it out at: https://rinkeby.etherscan.io/tx/${transfer.hash}`)   // transfer.hash DB에 저장 필요

        const hash = transfer.hash

        return Array(hash)
    }

    try { return Transfer()}
    catch (e) { console.error(e) }
}