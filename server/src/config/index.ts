import { config } from 'dotenv';

config();

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://admin:12345Admin@cluster0.t2qzfpk.mongodb.net/hcl?retryWrites=true&w=majority"