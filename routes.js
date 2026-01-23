import { Router } from "express";
import PostControl from "./controllers/PostControl.js";
import UserControl from "./controllers/UserControl.js";
import LikeControl from "./controllers/LikeControl.js"

const router = Router();
const postController = new PostControl();
const userController = new UserControl();
const likeController = new LikeControl();

router.post("/posts", (req, res) => postController.create(req, res));
router.get("/posts", (req, res) => postController.showAll(req, res));
router.put("/posts/:id", (req, res) => postController.update(req, res));
router.delete("/posts/:id", (req, res) => postController.destroy(req, res));


router.post("/users", (req, res) => userController.createUser(req, res));
router.get("/users", (req, res) => userController.showAllUsers(req, res));
router.put("/users/:id", (req, res) => userController.updateUser(req, res));
router.delete("/users/:id", (req, res) => userController.destroyUser(req, res));

router.post("/likes", (req, res) => likeController.like(req, res));

export default router;
