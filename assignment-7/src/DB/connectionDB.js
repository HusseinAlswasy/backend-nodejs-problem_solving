import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers([  // trnslate address
    "8.8.8.8",  // google
    "1.1.1.1"   // cloude
]);

const client = new MongoClient("mongodb+srv://husseinalswasy_db_user:56738Hussein@backendcluster.uxx2bfa.mongodb.net/")

export const db = client.db("mongoDB");


const connect = async (req, res) => {
    try {
        await client.connect()
        console.log("Connect To MongoDB");
        return db;
    } catch (error) {
        console.log("Can't Connect To MongoDB");
        console.log(error.message);

        throw error;
    }
}

export default connect;