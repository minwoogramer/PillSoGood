import { gql } from 'apollo-server-express';

export default gql`
    type Base {
        _id:String,
        name:String,
        level:Int,
        imagePath:String
    }

    type Query {
        getBases(jwt:String!):[Base]
        getBase(jwt:String!, _id:String!):Base
    }

    type Mutation {
        createBase(jwt:String!, name:String, level:Int, imagePath:String):Int!
        updateBase(jwt:String!, _id:String, name:String, level:Int, imagePath:String):Int!
        deleteBase(jwt:String!, _id:String):Int
    }



`