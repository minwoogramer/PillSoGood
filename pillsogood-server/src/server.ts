import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { resolvers, typeDefs } from "./graphql/schema";
import dotenv from "dotenv";
import mongoose from "mongoose";
import schedule from 'node-schedule';
import { sendMedicationAlert, initFirebaseAdmin } from "../src/batch/MedicationAlert"

dotenv.config();

declare let process : {
  env : {
    MONGODB_URL : string;
    KAS_ACCESSKEY_ID : string;
    KAS_SECRET_ACCESS_KEY : string;
  }} 

const PILL_SO_GOOD_SERVER_PORT = 4000;
const app = express();
const MONGO_DB_URL = process.env.MONGODB_URL;
const httpServer = http.createServer(app);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function initApolloServer() {
  
   await mongoose.connect(MONGO_DB_URL) // MongoDB와 서버 연결
  .then(() => {
    console.log("MongoDB Connection succeeded");
  })
  .catch((e: Error) => {            
    console.log("seq ERROR: ", e);
  });
 
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });  // apollo server에 express 연동
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PILL_SO_GOOD_SERVER_PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${PILL_SO_GOOD_SERVER_PORT}${apolloServer.graphqlPath}`
  );

  initFirebaseAdmin();
  // every minute cron
  schedule.scheduleJob('* * * * *', ()=>{ 
    sendMedicationAlert();
  });
}

void initApolloServer();