import express from "express";
import db from "../dbConfig.js";
import {
  createActivity,
  getActivitiesByCreator,
  deleteExpiredActivities,
  getActivityByPassword,
  deleteActivityById,
} from "../dataAccess/activityDa.js";
import { authenticateToken } from "../middleware.js";

let activityRouter = express.Router();

activityRouter.post("/create", authenticateToken, async (req, res) => {
  try {
    const { description, password, duration, createdBy } = req.body;
    const activity = await createActivity(
      description,
      password,
      duration,
      createdBy
    );

    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

activityRouter.get(
  "/getActivitiesBy/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const creatorId = req.params.id;
      const activities = await getActivitiesByCreator(creatorId);
      res.status(200).json(activities);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

activityRouter.delete("/deleteExpired", authenticateToken, async (req, res) => {
  try {
    const deletedIds = await deleteExpiredActivities();
    res
      .status(200)
      .json({ message: "Expired activities deleted", IDS: deletedIds });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

activityRouter.get("/:password", authenticateToken, async (req, res) => {
  try {
    const password = req.params.password;
    const activity = await getActivityByPassword(password);
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

activityRouter.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteActivityById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default activityRouter;
