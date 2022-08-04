import { gql } from 'apollo-server-express';

export default gql`
    type Medication {
        _id:String,
        medicine:String,
        condition:String,
        createdAt:String
    }
    type Query {
        getMedicationRecords(jwt:String!):[Medication]
    }
    type Mutation {
        createMedicationRecord(jwt:String!, medicine:String!, condition:String):Int!
        updateMedicationRecord(jwt:String!, _id:String!, medicine:String!, condition:String):Int!
        deleteMedicationRecord(jwt:String!, _id:String!):Int!
    }
`;