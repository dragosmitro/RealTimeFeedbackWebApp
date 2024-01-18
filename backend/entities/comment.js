import { Sequelize } from "sequelize";
import db from "../dbConfig.js";
import { User } from "./user.js";
import { Activity } from "./activity.js";

export const Comment = db.define("comment", {
  commentid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  userid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "userid",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  activityid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Activity,
      key: "activityid",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

User.hasMany(Comment, { foreignKey: "userid" });
Comment.belongsTo(User, { foreignKey: "userid" });

Activity.hasMany(Comment, { foreignKey: "activityid" });
Comment.belongsTo(Activity, { foreignKey: "activityid" });
