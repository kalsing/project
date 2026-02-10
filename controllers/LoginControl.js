import User from "../models/User.js";

class LoginControl {

    async register(req, res) {
        const { firstName, lastName, password } = req.body;


        const existingUser = await User.findOne({
            where: {
                firstName: firstName,
                lastName: lastName
            }
        });

        if (existingUser) {
            return res.status(400).json();
        }

        const user = await User.create({
            firstName,
            lastName,
            password
        });


        return res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        });
    }
}

export default LoginControl;