import User from "../models/User.js";
import Post from "../models/Post.js";
import Like from "../models/Like.js"

   export function generateToken(userId) {
        const secretKey = process.env.CHAVE;
        const createToken = jwt.sign(
            { userId },
            secretKey,
            { expiresIn: "15m" } 
            
        )
        console.log(createToken);
        return createToken;
    }








