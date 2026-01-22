import { DataTypes } from "sequelize";
import sequelize from "./database.js";

const Like = sequelize.define("Like", {
  numberOfLikes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Like;
