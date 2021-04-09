import express from 'express';
import cors from 'cors';
import api from './api';
import dotenv from 'dotenv';
import Axios from 'axios';

export const app = express();
dotenv.config({ path: __dirname + "/.env" });
const defaultBaseUrl = process.env.APP_URL || "http://localhost:8080";
Axios.defaults.baseURL = defaultBaseUrl;

app.use(cors({
  origin: defaultBaseUrl,
  optionsSuccessStatus: 200
}));

app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));
app.use("/api", api);