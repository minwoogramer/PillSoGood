import { gql } from 'apollo-server-express';

export default gql`
    type Prescription {
        _id:String,
        medicine:String,
        alertTime:String,
        lastMedicationCount:Int,
        createdAt:String
    }
    type Query {
        getPrescriptionRecords(jwt:String!):[Prescription]
    }
    type Mutation {
        createPrescriptionRecord(jwt:String!, medicine:String!, alertTime:String!, lastMedicationCount:Int!):Int!
        updatePrescriptionRecord(jwt:String!, _id:String!, medicine:String!, alertTime:String!, lastMedicationCount:Int!):Int!
        deletePrescriptionRecord(jwt:String!, _id:String!):Int!
    }
`;