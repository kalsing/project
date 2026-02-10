import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Like = sequelize.define("Like", {
}, {
  indexes: [
    {
      unique: true,
      fields: ["userId", "postId"]
    }
  ]
});

export default Like;
