  import User from "../models/User.js";
import Post from "../models/Post.js";
import Like from "../models/Like.js"

class LikeControl {

  async like(req, res) {
    const userId = req.body.userId;
    const postId = req.body.postId;

    const addLike = await Like.create({
        userId: userId,
        postId: postId
    });
    return res.json(addLike);
  }

  async likeCounter(req, res){
    const postId = req.params.postId;

    const countLikes = await Like.count({
      where: {
      postId: postId
      }

    });
    return res.json(countLikes);
  }
  
  async unlike(req, res) {
        const userId = req.body.userId;
        const postId = req.body.postId;

    const unlike = await Like.destroy({
        where: { 
          userId: userId,
          postId: postId
        }
    });
    return res.status(204).send();
  }
}
export default LikeControl;
