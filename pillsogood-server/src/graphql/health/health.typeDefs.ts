import { gql } from 'apollo-server-express';

export default gql`
    type Health {
        _id:String,
        height:Int,
        weight:Int,
        lowHypertension:Int,
        highHypertension:Int,
        bloodSugarLevel:Int,
        createdAt:String
    }

    type Query {
        getHealthRecords(jwt:String!):[Health]
    }

    type Mutation {
        createHealthRecord(jwt:String!, height:Int!, weight:Int!, lowHypertension:Int!, highHypertension:Int!, bloodSugarLevel:Int!):Int!
        updateHealthRecord(jwt:String!, _id:String!, weight:Int!, lowHypertension:Int!, highHypertension:Int!, bloodSugarLevel:Int!):Int!
        deleteHealthRecord(jwt:String!, _id:String!):Int!
    }
`;