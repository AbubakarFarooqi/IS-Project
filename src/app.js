import express from "express";
import cookieParser from "cookie-parser";
const app = express();

// middlewares

app.use(express.json());
app.use(express.static("public")); // used to use static assests stored in public folder
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

export default app;
