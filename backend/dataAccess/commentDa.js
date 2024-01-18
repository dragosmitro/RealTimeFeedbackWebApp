import mysql from "mysql2";
import dotenv from "dotenv/config";
import { error } from "console";
import { Comment } from "../entities/comment.js";

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "proiecttw",
});

export async function createComment(comment, userid, activityid) {
  const now = new Date();
  return await Comment.create({ comment, now, userid, activityid });
}

export async function getCommentsByActivityId(activityid) {
  const comments = await Comment.findAll({
    where: { activityid },
  });
  return comments;
}

export async function deleteCommentsByActivityId(activityid) {
  try {
    const result = await Comment.destroy({
      where: { activityid },
    });
    return result;
  } catch (error) {
    console.error("Error deleting comments:", error);
    throw error;
  }
}
