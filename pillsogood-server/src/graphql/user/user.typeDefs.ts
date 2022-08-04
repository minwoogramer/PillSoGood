import { gql } from 'apollo-server-express';

export default gql`
    type User {
        _id:String,
        email:String,
        password:String,
        nickname:String,
        dateOfBirth:String,
        pointBalance:Int,
        createdAt:String,
        disease: [Int],
        phoneNumber:String,
        firebaseToken: String
    }

    type Token {
        jwt:String,
        email: String,
        nickname: String,
        _id: String
    }

    type Query {
        hi:String
        getUserInfo(jwt:String!, _id:String):User
        getUsers(jwt:String!, nickname:String, email:String):[User]
    }

    type Mutation {
        join(nickname:String!, email:String!, dateOfBirth:String!, password:String,  phoneNumber:String, disease:[Int]):Int!
        login(email:String!, password:String!, firebaseToken:String!):Token!
        updateUserInfo(jwt:String!, nickname:String, password:String, phoneNumber:String, email:String, disease:[Int]):Int!
        updateUserPassword(jwt:String!, _id:String!, password:String):Int!
        updateUserBalance(jwt:String!, pointBalance:Int):Int!
    }
`;