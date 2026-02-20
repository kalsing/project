import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt, { compare } from "bcrypt";
import { generateToken } from "./JwtFunctions.js";

class LoginControl {

  async loginUser(req, res) {

    const user = await User.findOne({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      }
    });

    if (!user) {
      return res.status(400).send()
    }

    const hashCompare = await bcrypt.compare(req.body.userPassword, user.userPassword)

    if (!hashCompare) {
      return res.status(400).send()
    }

    const token = generateToken(user.id)

    return res.json({
      id: user.id,
      userId: user.id,  
      firstName: user.firstName,
      lastName: user.lastName,
      token: token
    })
  }
}
export default LoginControl;