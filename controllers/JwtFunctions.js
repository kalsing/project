import 'dotenv/config'
import jwt from "jsonwebtoken";


 const secretKey = process.env.CHAVE;


export function generateToken(id) {
  const token = jwt.sign(
    { id: id },
  secretKey,
    { expiresIn: "15m" }
  );
  return token;
}


export function verifyToken(token){
  const verify = jwt.verify(
    token, secretKey
  )
  return verify;
}