import { gql } from 'apollo-server-express'

export default gql`
  type Character {
    _id: String
    userId: String
    name: String
    level: Int
    baseId: String
    description: String
    hash: String
    tokenId: String
    userInfo: User
  }

  type User {
    _id: String
    email: String
    password: String
    nickname: String
    dateOfBirth: String
    pointBalance: Int
    createdAt: String
    disease: [Int]
    phoneNumber: String
    firebaseToken: String
  }

  type Query {
    getCharacters(jwt: String!): [Character]
    getAllCharacters(jwt: String!): [Character]
  }
  type Hash {
    transferHash: String
  }

  type Mutation {
    createCharacter(
      jwt: String!
      name: String!
      baseId: String!
      description: String!
    ): Int!
    updateCharacter(
      jwt: String!
      _id: String!
      name: String!
      level: Int!
      description: String!
    ): Int!

    transferCharacter(
      jwt: String!
      _id: String!
      tokenId: String!
      receiverAddress: String!
    ): Hash!
  }
`
