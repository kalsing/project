import sequelize from "../database.js";
import { DataTypes } from "sequelize";



const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
      },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["firstName", "lastName"],
      },
    ],
  }
);
export default User;
