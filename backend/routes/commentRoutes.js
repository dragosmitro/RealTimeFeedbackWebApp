import express from "express";
import db from "../dbConfig.js";
import { authenticateToken } from "../middleware.js";
import {
  createComment,
  getCommentsByActivityId,
  deleteCommentsByActivityId,
} from "../dataAccess/commentDa.js";

let commentRouter = express.Router();

commentRouter.post("/create", authenticateToken, async (req, res) => {
  try {
    const { comment, userid, activityid } = req.body;
    const comm = await createComment(comment, userid, activityid);
    res.status(201).json(comm);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

commentRouter.get("/get/:id", authenticateToken, async (req, res) => {
  try {
    const activityId = req.params.id;
    const comms = await getCommentsByActivityId(activityId);
    res.status(200).json(comms);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

commentRouter.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const activityId = req.params.id;
    const comms = await deleteCommentsByActivityId(activityId);
    res.status(200).json(comms);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

export default commentRouter;
