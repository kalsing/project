import jwt from "jsonwebtoken";

export function generateToken(id) {
  const secretKey = process.env.CHAVE;

  const createToken = jwt.sign(
    { id: id },
        "gabriel123",
    { expiresIn: "15m" }
  );

  console.log(createToken);
  return createToken;
}