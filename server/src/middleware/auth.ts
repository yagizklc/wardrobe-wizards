import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// If you're using dotenv for environment variables, load the configuration
dotenv.config();

const config = process.env;

// Extend the Request type to include the 'user' property
interface Request extends ExpressRequest {
  user?: string;
}

// Define the shape of the token payload
interface TokenPayload extends Record<string, any> {
  user_id: string;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.params.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY as string) as TokenPayload;
    console.log(
      `
      decoded: ${decoded}
      `
    );
    req.user = decoded.user_id;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
