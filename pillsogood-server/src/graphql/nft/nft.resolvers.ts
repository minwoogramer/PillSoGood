import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import { createLog } from "../../utils/log"
import { ERC721Mint, ERC721transfer } from "../../contracts/ERC721"

const Nft = require("../../models/nft")
const User = require("../../models/user")
const moment = require("moment")

type nft = {
    _id: string
    tokenURI: string
    imagePath: string
    nftHash: string
    tokenId: string
    user: user
}

type user = {
    _id: string
    email: string
    nickname: string
    dateOfBirth: string
    pointBalance: number
    createdAt: string
    phoneNumber: string
    disease: [number]
}

  
export default {
    Nft: {
        async user(root:any) {
            const userInfo = await User.findOne({
                _id:root.userId
            })
            return userInfo
        }
    },
    Query: {
        async getAllNfts(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const nfts = Nft.find()
            return nfts
        },
        async getNfts(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("getNfts", userInfo._id)
            
            const nfts = Nft.find({
                userId:userInfo._id
            })
            return nfts
        }
    },

    Mutation: { // jwt, tokenuri, imagepath 받아야 함
        async createNft(_:any, args:{jwt:string, tokenURI:string, imagePath:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("createNft", userInfo._id)

            const mintNFT = await ERC721Mint(args.tokenURI)   // ERC721Mint 함수의 인자는 tokenuri가 필요하고 그 인자에 해당하는 args.tokenURI 삽입
                                                              // ERC721Mint는 return 값으로 { hash, tokenId } 가짐. 
                                                              // 즉, mintNFT = [ hash, tokenId ]  --- mintNFT[0] = hash, 
                                                              //                                      mintNFT[1] = tokenId  
            if(mintNFT !==  undefined){
                const newNft = new Nft()                   
                newNft.tokenURI = args.tokenURI         
                newNft.imagePath = args.imagePath
                newNft.userId = userInfo._id
                newNft.nftHash = mintNFT[0]               // mintNFT에서 생성된 transaction Hash 저장
                newNft.tokenId = mintNFT[1]               // mintNFt에서 생성된 tokenId 저장
                newNft.createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
    
                const res = await newNft.save()
                if(!res) return status.SERVER_ERROR
                return status.SUCCESS
            }
            else { return status.SERVER_ERROR }
        },

        async bringMyNft(_:any, args:{jwt:string, _id:string, tokenId:string, receiveraddress:string}) { // 옮기려는 nft TokenId, 사용자 메타마스크 지갑 주소 받아야함. jwt에 담겨져 오나? 
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("bringMyNft", userInfo._id)
            
            const bringmyNFT = await ERC721transfer(args.receiveraddress, args.tokenId)    // ERC721transfer 함수의 인자는 receiveraddress, tokenId가 필요함.
                                                                                           // ERC721transfer는 return 값으로 { hash } 가짐. 
                                                                                           // 즉, bringmyNFT = [ hash ]  --- bringmyNFT[0] = hash                                   
           
            if(bringmyNFT !== undefined){

                const res = await Nft.updateOne(
                    {_id:args._id, userId:userInfo._id},
                    { nftHash:bringmyNFT[0], createdAt:new Date()}          // bringmyNFT에서 생성된 transaction Hash값으로 nftHash 업데이트
                )
                if(!res) return status.SERVER_ERROR
                return status.SUCCESS
            }
            else { return status.SERVER_ERROR }
            }                                                                             
    }
}