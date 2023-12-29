import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/jwt.helper";

export default async (req: any, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(403).json({
      code: 403,
      message: "You aren't allowed to access this endpoint",
    });
  }

  const userToken = authToken.split(" ")[1];
  if (!userToken) {
    return res.status(403).json({
      code: 403,
      message: "You aren't allowed to access this endpoint",
    });
  }

  console.log("userToken : ", userToken);
  const verifyTokenResult = verifyToken(userToken);
  if (!verifyTokenResult.isValid) {
    return res.status(403).json({
      code: 403,
      message: "Invalid Token",
    });
  }

  const { id, username, email } = verifyTokenResult.data;
  req.userId = id;
  req.usename = username;
  req.userEmail = email;
  next();
};
