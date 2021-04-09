import express from 'express';
import http from 'http';
import cors from 'cors';
import api from './api';
import client from './client/components/router';
import dotenv from 'dotenv';
import Axios from 'axios';


const app = express();
const server = http.createServer(app);
dotenv.config({ path: __dirname + "/.env" });
const defaultBaseUrl = process.env.APP_URL || "http://localhost:8080";

Axios.defaults.baseURL = defaultBaseUrl;
app.use(cors({
  origin: defaultBaseUrl,
  optionsSuccessStatus: 200
}));

app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));
app.use("/", client);
app.use("/api", api);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("App is running on:", PORT));