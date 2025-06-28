import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export const app = express();

app.use(cors());

app.use(express.json({ limit: '10gb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10gb' }));

app.set('trust proxy', true);
