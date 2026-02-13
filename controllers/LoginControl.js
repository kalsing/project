import User from "../models/User.js";
import Post from "../models/Post.js";
import { useRadioGroup } from "@mui/material";

class LoginControl {

  async loginUser(req, res) {

    const user = await User.findOne({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userPassword: req.body.userPassword
      }
    });

    if (!user) {
      return res.status(400).send()
    }

    if (user.userPassword !== req.body.userPassword) {
      return res.status(400).send()
    }
    return res.json({
      userId: user.id,  
      firstName: user.firstName,
      lastName: user.lastName
    })
  }
}
export default LoginControl;