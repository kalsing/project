import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content:{
    type: DataTypes.STRING,
    allowNull: false,
  }
}
);

export default Post;
