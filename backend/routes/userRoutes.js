import express from "express";
import db from "../dbConfig.js";
import { createUser, loginUser } from "../dataAccess/userDa.js";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware.js";

let userRouter = express.Router();

userRouter.route("/create").post(async (req, res) => {
  try {
    const { username, password, type } = req.body;
    const user = await createUser({ username, password, type });
    const token = jwt.sign(
      {
        userid: user.dataValues.userid,
        username: user.dataValues.username,
        type: user.dataValues.type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ message: "User created", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser({ username, password });
    const token = jwt.sign(
      {
        userid: user.dataValues.userid,
        username: user.dataValues.username,
        type: user.dataValues.type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

userRouter.get("/getUserInformation", authenticateToken, (req, res) => {
  const { userid, username, type } = req.user;
  res.json({ userid, username, type });
});

export default userRouter;
