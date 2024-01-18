import { Sequelize } from "sequelize";
import db from "../dbConfig.js";
import { User } from "./user.js";

export const Activity = db.define("activity", {
  activityid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  activitydesc: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  createdBy: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "userid",
    },
    allowNull: false,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
Activity.belongsTo(User, { foreignKey: "createdBy" });
