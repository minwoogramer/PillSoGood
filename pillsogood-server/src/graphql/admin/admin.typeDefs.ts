import { gql } from 'apollo-server-express';

export default gql`
    type Admin {
        _id:String,
        name:String,
        email:String,
        createdAt:String
    }

    type Token {
        jwt:String
    }

    type Query {
        getAdmins(jwt:String!):[Admin]
        getAdminInfo(jwt:String!):Admin

    }

    type Mutation {
        joinAdmin(email:String!, name:String!, password:String):Int!
        loginAdmin(email:String!, password:String!):Token!
    }
`;