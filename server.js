import express from "express";
import sequelize from "./database.js";
import User from "./tables/User.js";
import Post from "./tables/Post.js";
import { mapWhereFieldNames } from "sequelize/lib/utils";
import PostControl from "./controllers/PostControl.js";
import router from "./routes.js";
import Like from "./tables/Like.js";


User.hasMany(Post);
Post.belongsTo(User);


Like.belongsTo(User);
Like.belongsTo(Post);
User.hasMany(Like);
Post.hasMany(Like);

const app = express();
app.use(express.json());
app.use(router);


async function startServer() {
    try {
        await sequelize.sync();
        console.log("banco inicializado");

        app.listen(3000, () => {
            console.log("servidor na porta 3000");
        });
    } catch (error) {
        console.error("erro", error);
    }
}

startServer();