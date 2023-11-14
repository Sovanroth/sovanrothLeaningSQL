import express from "express";
import cors from "cors"
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import http from "http"
import router from "./routers";
import db from "./config/db.config";

const app = express();

app.use(cors({
    credentials: true,
    origin: "*"
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8000, () => {
    console.log("Sever is Running on port 8000")
})

app.use("/", router())
