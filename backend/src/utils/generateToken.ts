// utils/generateToken.ts
import { Response } from "express";
import jwt from "jsonwebtoken";
import { parseExpirationTime } from "./parseExpirationTime.js";

export const generateToken = (userId: string, res: Response): string => {
  const { JWT_SECRET, EXPIRATION_TIME } = process.env;

  if (!JWT_SECRET || !EXPIRATION_TIME) {
    throw new Error(
      "Missing JWT_SECRET or EXPIRATION_TIME in environment variables"
    );
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: EXPIRATION_TIME,
  } as jwt.SignOptions);

  const cookieMaxAge = parseExpirationTime(EXPIRATION_TIME);

  res.cookie("jwt", token, {
    maxAge: cookieMaxAge,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
