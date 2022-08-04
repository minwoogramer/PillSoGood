import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!, $firebaseToken: String!) {
    login(email: $email, password: $password, firebaseToken: $firebaseToken) {
      jwt
      email
      nickname
      _id
    }
  }
`;

export const SIGN_UP = gql`
  mutation Mutation(
    $nickname: String!
    $email: String!
    $dateOfBirth: String!
    $password: String
    $phoneNumber: String
    $disease: [Int]
  ) {
    join(
      nickname: $nickname
      email: $email
      dateOfBirth: $dateOfBirth
      password: $password
      phoneNumber: $phoneNumber
      disease: $disease
    )
  }
`;

export const USERQUERY = gql`
  query GetUserInfo($jwt: String!) {
    getUserInfo(jwt: $jwt) {
      email
      nickname
      password
      dateOfBirth
      pointBalance
      _id
      createdAt
      disease
      phoneNumber
    }
  }
`;

export const UserMutation = gql`
  mutation UpdateUserBalance($jwt: String!, $pointBalance: Int) {
    updateUserBalance(jwt: $jwt, pointBalance: $pointBalance)
  }
`;

export const CharQuery = gql`
  query GetBases($jwt: String!) {
    getBases(jwt: $jwt) {
      _id
      name
      level
      imagePath
    }
  }
`;

export const CharSubmit = gql`
  mutation CreateCharacter(
    $jwt: String!
    $name: String!
    $baseId: String!
    $description: String!
  ) {
    createCharacter(
      jwt: $jwt
      name: $name
      baseId: $baseId
      description: $description
    )
  }
`;

export const NftQuery = gql`
  query GetCharacters($jwt: String!) {
    getCharacters(jwt: $jwt) {
      _id
      userId
      name
      level
      baseId
      description
      hash
      tokenId
    }
  }
`;

export const MEDICINE_ALARM = gql`
  mutation CreatePrescriptionRecord(
    $jwt: String!
    $medicine: String!
    $alertTime: String!
    $lastMedicationCount: Int!
  ) {
    createPrescriptionRecord(
      jwt: $jwt
      medicine: $medicine
      alertTime: $alertTime
      lastMedicationCount: $lastMedicationCount
    )
  }
`;

export const HEALTH_RECORD = gql`
  mutation CreateHealthRecord(
    $jwt: String!
    $height: Int!
    $weight: Int!
    $lowHypertension: Int!
    $highHypertension: Int!
    $bloodSugarLevel: Int!
  ) {
    createHealthRecord(
      jwt: $jwt
      height: $height
      weight: $weight
      lowHypertension: $lowHypertension
      highHypertension: $highHypertension
      bloodSugarLevel: $bloodSugarLevel
    )
  }
`;
export const GET_MEDICINE_ALARM = gql`
  query GetPrescriptionRecords($jwt: String!) {
    getPrescriptionRecords(jwt: $jwt) {
      _id
      medicine
      alertTime
      lastMedicationCount
      createdAt
    }
  }
`;
export const POST_MEDICINE_RECORD = gql`
  mutation CreateMedicationRecord(
    $jwt: String!
    $medicine: String!
    $condition: String!
  ) {
    createMedicationRecord(
      jwt: $jwt
      medicine: $medicine
      condition: $condition
    )
  }
`;
