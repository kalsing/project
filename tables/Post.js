import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Post;
