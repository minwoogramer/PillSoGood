import { gql } from 'apollo-server-express';

export default gql`
    type Log {
        _id:String,
        methodName:String,
        user:User,
        createdAt:String,
        count:Int

    }

    type User {
        _id:String,
        email:String,
        password:String,
        nickname:String,
        dateOfBirth:String,
        pointBalance:Int,
        createdAt:String,
        disease: [Int],
        phoneNumber:String
    }

    type Query {
        getLogsByCreatedAt(jwt:String, createdAt:String):[Log]
    }
`