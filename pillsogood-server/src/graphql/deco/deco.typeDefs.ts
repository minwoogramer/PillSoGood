import { gql } from 'apollo-server-express';

export default gql`
    type Deco {
        _id:String,
        characterId:String,
        itemId:String,
        location:String,
        userId:String
        item:Item
    }

    type Item {
        _id:String,
        name:String,
        type:Int,
        imagePath:String
    }

    type Query {
        getDecoItems(jwt:String!):[Deco]
        getCharacterDecoItems(jwt:String!, characterId:String!):[Deco]

    }

    type Mutation {
        addDecoItem(jwt:String!, itemId:String!):Int!
        addCharacterDecoItem(jwt:String!, characterId:String!, itemId:String, location:String!):Int!
        removeCharacterDecoItem(jwt:String!, characterId:String!, itemId:String!):Int!
    }
`;