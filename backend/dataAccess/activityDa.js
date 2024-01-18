import mysql from "mysql2";
import dotenv from "dotenv/config";
import { error } from "console";
import { Activity } from "../entities/activity.js";
import { Op } from "sequelize";

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "proiecttw",
});

export async function createActivity(
  description,
  password,
  durationMinutes,
  createdBy
) {
  const activity = await Activity.findOne({ where: { password } });
  if (activity) {
    throw new Error("Activity with the same password already exists!");
  }
  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

  const newActivity = await Activity.create({
    activitydesc: description,
    password: password,
    startDate: startDate,
    endDate: endDate,
    createdBy: createdBy,
  });

  return newActivity;
}

export async function getActivitiesByCreator(userid) {
  try {
    const activities = await Activity.findAll({
      where: {
        createdBy: userid,
      },
    });
    return activities;
  } catch (err) {
    console.error("Error fetching activities", err);
    throw err;
  }
}

export async function deleteExpiredActivities() {
  try {
    const now = new Date();
    const activitiesToDelete = await Activity.findAll({
      attributes: ["activityid"],
      where: {
        endDate: {
          [Op.lt]: now,
        },
      },
    });
    const activityIds = activitiesToDelete.map(
      (activity) => activity.activityid
    );
    await Activity.destroy({
      where: {
        activityid: {
          [Op.in]: activityIds,
        },
      },
    });
    return activityIds;
  } catch (err) {
    console.error("Error deleting expired activities:", err);
    throw err;
  }
}

export async function getActivityByPassword(pass) {
  try {
    const result = await Activity.findOne({
      where: {
        password: pass,
      },
    });
    return result;
  } catch (err) {
    console.error("Error trying to find activity with password:", err);
    throw err;
  }
}

export async function deleteActivityById(activityId) {
  try {
    const result = await Activity.destroy({
      where: { activityid: activityId },
    });
    return result;
  } catch (error) {
    console.error("Error deleting activity:", error);
    throw error;
  }
}
