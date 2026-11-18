import mongoose from "mongoose";
import dns from "dns";
import { Resolver } from "dns/promises";

// Use Google's public DNS 8.8.8.8 to resolve SRV records
const resolver = new Resolver();
resolver.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        // Manually resolve SRV using Google DNS to bypass network restrictions
        let uri = process.env.MONGODB_URI;

        try {
            const srvRecords = await resolver.resolveSrv("_mongodb._tcp.cluster0.dkfillo.mongodb.net");
            const hosts = srvRecords.map(r => `${r.name}:${r.port}`).join(",");
            const txtRecords = await resolver.resolveTxt("cluster0.dkfillo.mongodb.net");
            const options = txtRecords.flat().join("&");
            uri = `mongodb://samridh25cse_db_user:cy9nf5Yb5A4QJHIR@${hosts}/intro-to-backend?ssl=true&authSource=admin&retryWrites=true&w=majority`;
            console.log("Resolved URI via Google DNS");
        } catch (e) {
            console.log("Custom DNS failed, using original URI:", e.message);
        }

        const connectionInstance = await mongoose.connect(uri);
        console.log(`\n MongoDB connected !!!
            ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MongoDB connection failed", error.message);
        process.exit(1);
    }
}

export default connectDB;
