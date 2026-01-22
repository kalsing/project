import sequelize from "../database.js";
import { DataTypes } from "sequelize";



const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});

export default User;
