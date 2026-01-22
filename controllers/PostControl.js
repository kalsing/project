import User from "../tables/User.js";
import Post from "../tables/Post.js";

class PostControl {

  async create(req, res) {
    const post = await Post.create({
      title: req.body.title,
      UserId: req.body.userId
    });
    return res.json(post);
  }

  async showAll(req, res) {
    const posts = await Post.findAll({
      include: User
    });
    return res.json(posts);
  }

  async update(req, res) {
    const updated = await Post.update(
      req.body,
      {where: {id: req.params.id}}
    );

    return res.json(await Post.findByPk(req.params.id));
  }

  async destroy(req, res) {
    const deleted = await Post.destroy({
      where: { id: req.params.id }
    });
    return res.status(200).send();
  }
}

export default PostControl;
