import { getUserInfoByToken } from '../../utils/jwt'
import { status } from '../../constants/code'
import { createLog } from '../../utils/log'
import { NFTStorage, File, Blob } from 'nft.storage'
import fs from 'fs'
import dotenv from 'dotenv'
import { ERC721Mint, ERC721transfer } from '../../contracts/ERC721'

const User = require('../../models/user')
const Character = require('../../models/character')
const moment = require('moment')

dotenv.config()

declare let process: {
  env: {
    NFT_STORAGE_API_TOKEN: string
  }
}

const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_TOKEN })

type character = {
  _id: string
  userId: string
  name: string
  level: number
  description: string
  hash: string
  tokenId: string
}

type user = {
  _id: string
  email: string
  password: string
  nickname: string
  dateOfBirth: string
  pointBalance: number
  createdAt: string
  phoneNumber: string
  disease: [number]
}

export default {
  Character: {
    async userInfo(root: any) {
      const userInfo = await User.findOne({
        _id: root.userId,
      })
      return userInfo
    },
  },
  Query: {
    async getAllCharacters(_: any, args: { jwt: string }) {
      const userInfo = getUserInfoByToken(args.jwt)
      if (!userInfo) return status.TOKEN_EXPIRED

      const characters = Character.find()
      return characters
    },
    async getCharacters(_: any, args: { jwt: string }) {
      const userInfo = getUserInfoByToken(args.jwt)
      if (!userInfo) return status.TOKEN_EXPIRED

      createLog('getCharacters', userInfo._id)

      const characters = Character.find({
        userId: userInfo._id,
      })
      return characters
    },
  },
  Mutation: {
    async createCharacter(
      _: any,
      args: { jwt: string; name: string; baseId: string; description: string },
    ) {
      const userInfo = getUserInfoByToken(args.jwt)
      if (!userInfo) return status.TOKEN_EXPIRED

      createLog('createCharacter', userInfo._id)
      // Url에서 이미지 다운로드 위한 세팅
      const download = require('image-downloader')
      const options = {
        url: args.baseId,
        dest: '../../images', // will be saved to /path/to/dest/images/ ~.jpeg
      }

      // url에서 이미지 다운
      const imageFileName = await download
        .image(options)
        .then(({ filename }: any) => {
          return filename
        })

      // nft.Storage 모듈 사용해서 IPFS에 JSON 파일 생성
      const metadata = await client.store({
        name: args.name,
        description: args.description,
        image: new File([fs.readFileSync(imageFileName)], 'image.jpeg', {
          type: 'image/png',
        }),
      })

      const mintNFT = await ERC721Mint(metadata.url) // ERC721Mint 함수의 인자는 tokenuri가 필요하고 그 인자에 해당하는 args.tokenURI 삽입
      // ERC721Mint는 return 값으로 { hash, tokenId } 가짐.
      // 즉, mintNFT = [ hash, tokenId ]  --- mintNFT[0] = hash,
      //                                      mintNFT[1] = tokenId

      // 새로운 필드 저장
      if (mintNFT !== undefined) {
        const newCharacter = new Character()
        newCharacter.name = args.name
        newCharacter.level = 1
        newCharacter.userId = userInfo._id
        newCharacter.baseId = args.baseId
        newCharacter.description = args.description
        newCharacter.hash = mintNFT[0]
        newCharacter.tokenId = mintNFT[1]
        newCharacter.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')

        const res = await newCharacter.save()

        if (!res) return status.SERVER_ERROR
        return status.SUCCESS
      } else {
        return status.SERVER_ERROR
      }
    },
    async updateCharacter(
      _: any,
      args: {
        jwt: string
        _id: string
        name: string
        level: number
        description: string
      },
    ) {
      const userInfo = getUserInfoByToken(args.jwt)
      if (!userInfo) return status.TOKEN_EXPIRED

      createLog('updateCharacter', userInfo._id)

      const res = await Character.updateOne(
        { _id: args._id, userId: userInfo._id },
        { name: args.name, level: args.level, description: args.description },
      )
      if (!res) return status.SERVER_ERROR
      return status.SUCCESS
    },

    async transferCharacter(
      _: any,
      args: {
        jwt: string
        _id: string
        tokenId: string
        receiverAddress: string
      },
    ) {
      const userInfo = getUserInfoByToken(args.jwt)
      if (!userInfo) return status.TOKEN_EXPIRED

      createLog('transferCharacter', userInfo._id)

      const transfer = await ERC721transfer(args.receiverAddress, args.tokenId) // ERC721transfer 함수의 인자는 receiverAddress, tokenId가 필요함.

      // ERC721transfer는 return 값으로 { hash } 가짐.
      // 즉, transfer = [ hash ]  --- transfer[0] = hash
      if (transfer !== undefined) {
        const transferHash = transfer[0]
        const res = await Character.updateOne(
          { userId: userInfo._id },
          { hash: transferHash, createdAt: new Date() }, // transfer에서 생성된 transaction Hash값으로 nftHash 업데이트
        )

        if (!res) return status.SERVER_ERROR
        return { transferHash: transferHash }
      } else {
        return status.SERVER_ERROR
      }
    },
  },
}
