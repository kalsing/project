import sequelize from "./database.js";
import { DataTypes } from "sequelize";

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Post;