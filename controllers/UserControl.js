import User from "../models/User.js";
import Post from "../models/Post.js";
import { useRadioGroup } from "@mui/material";

class UserControl {

  async createUser(req, res) {
    //#1
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userPassword: req.body.userPassword
    });
    
    return res.json(user);
}

  async showAllUsers(req, res) {
    const users = await User.findAll({
    });
    return res.json(users);
  }


  async updateUser(req, res) {
    const updated = await User.update(
      req.body,
      {where: {id: req.params.id}}
    );

    return res.json(await User.findByPk(req.params.id));
  }

  
  async destroyUser(req, res) {
    const deleted = await User.destroy({
      where: {id: req.params.id}
    });
    return res.status(200).send();
  }
}

export default UserControl;
