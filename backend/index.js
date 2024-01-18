import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import activityRouter from "./routes/activityRoutes.js";
import commentRouter from "./routes/commentRoutes.js";

let app = express();
let router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  const start = new Date().getTime();
  res.on("finish", () => {
    const duration = new Date().getTime() - start;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });
  next();
});
app.use("/api/user", userRouter);
app.use("/api/activity", activityRouter);
app.use("/api/comment", commentRouter);
let conn;

mysql
  .createConnection({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  })
  .then((connection) => {
    conn = connection;
    return connection.query("CREATE DATABASE IF NOT EXISTS proiecttw");
  })
  .then(() => {
    return conn.end();
  })
  .catch((err) => {
    console.warn(err);
  });

app.listen(process.env.PORT ?? 5049, () => {
  console.log("Server running on port " + process.env.PORT ?? 5049);
});

// COD SQL

// CREATE TABLE IF NOT EXISTS `user` (
//   `userid` int(11) NOT NULL AUTO_INCREMENT,
//   `username` varchar(50) NOT NULL DEFAULT '',
//   `password` varchar(100) NOT NULL DEFAULT '',
//   `type` varchar(50) NOT NULL DEFAULT '',
//   PRIMARY KEY (`userid`),
//   UNIQUE KEY `UNIQUE_USERNAME` (`username`)
// ) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

// CREATE TABLE IF NOT EXISTS `activity` (
//   `activityid` int(11) NOT NULL AUTO_INCREMENT,
//   `activitydesc` varchar(300) DEFAULT NULL,
//   `password` varchar(50) DEFAULT NULL,
//   `startDate` datetime DEFAULT NULL,
//   `endDate` datetime DEFAULT NULL,
//   `createdBy` int(11) DEFAULT NULL,
//   PRIMARY KEY (`activityid`),
//   UNIQUE KEY `Index 2` (`password`),
//   KEY `createdBy` (`createdBy`)
// ) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

// CREATE TABLE IF NOT EXISTS `comment` (
//   `commentid` int(11) NOT NULL AUTO_INCREMENT,
//   `comment` varchar(50) DEFAULT NULL,
//   `time` datetime DEFAULT NULL,
//   `userid` int(11) DEFAULT NULL,
//   `activityid` int(11) DEFAULT NULL,
//   PRIMARY KEY (`commentid`),
//   KEY `userid` (`userid`),
//   KEY `activityid` (`activityid`)
// ) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
