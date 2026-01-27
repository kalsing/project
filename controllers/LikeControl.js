import User from "../tables/User.js";
import Post from "../tables/Post.js";
import Like from "../tables/Like.js"

class LikeControl {

  async like(req, res) {
    const userId = req.body.userId;
    const postId = req.body.postId;

    const like = await Like.create({
        UserId: userId,
        PostId: postId
    });
    return res.json(like);
  }

  async countLikes(req, res) {
    const totalLikes = Like.count(
    where: {
      PostId, PostId
    })
    return res.json ({ totalLikes });
  };
  
  async unlike(req, res) {
        const userId = req.body.userId;
        const postId = req.body.postId;

    const unlike = await Like.destroy({
        where: { 
          UserId: userId,
          PostId: postId
        }
    });
    return res.status(204).send();
  }
}
export default LikeControl;
