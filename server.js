import express from "express";
import sequelize from "./database.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import PostControl from "./controllers/PostControl.js";
import router from "./routes.js";
import Like from "./models/Like.js";
import cors from "cors";


User.hasMany(Post, { foreignKey: 'userId', onDelete: "CASCADE"});
Post.belongsTo(User, { foreignKey: 'userId'});


Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Post, { foreignKey: 'postId' });
User.hasMany(Like, { foreignKey: 'userId', onDelete: "CASCADE" });
Post.hasMany(Like, { foreignKey: 'postId', onDelete: "CASCADE" });

const app = express();
app.use(cors());
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