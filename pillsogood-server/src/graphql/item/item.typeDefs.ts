import { gql } from 'apollo-server-express';

export default gql`
    type Item {
        _id:String,
        name:String,
        type:Int,
        imagePath:String
    }

    type Query {
        getItems(jwt:String!):[Item]
        getItem(jwt:String, _id:String):Item
    }

    type Mutation {
        createItem(jwt:String!, type:Int!, name:String!, imagePath:String!):Int!
        updateItem(jwt:String!, _id:String!, type:Int!, name:String!, imagePath:String!):Int!
        deleteItem(jwt:String!, _id:String!):Int!
    }
`