import { app } from "./app";
import http from 'http';
import client from './client/components/router';

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// SSR client is separated from app to be able to use jest and supertest
app.use("/", client);

server.listen(PORT, () => console.log("App is running on:", PORT));