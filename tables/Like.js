import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Like = sequelize.define("Like", {
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PostId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["UserId", "PostId"]
    }
  ]
});

export default Like;