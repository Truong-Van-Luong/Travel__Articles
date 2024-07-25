import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://luongtvpd08420:v7H4CzqQ16VSVLW5@cluster0.w65zti4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

class Connection {

  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  }

  async connect() {
    try {
      console.log("Connecting to MongoDB...");
      await this.client.connect();
      
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      
      return await this.client.db("posts");
    } catch (e) {
      console.error(e);
    }
  }

  async close() {
    await this.client.close();
    console.log("Closed MongoDB connection");
  }
}

// export client
export default new Connection;
