import sequelize from "./database.js";
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

console.log(User === sequelize.models.User); // true

export default User;
