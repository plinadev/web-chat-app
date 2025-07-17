import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import prisma from "../db/prisma.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please fill in all fields" });
    }
    if (password !== confirmPassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Passwords don't match" });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Username already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const profilePic = `https://robohash.org/${username}.png?set=set4`;

    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic,
      },
    });

    if (newUser) {
      generateToken(newUser.id, res);

      res.status(StatusCodes.CREATED).json({
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid user data" });
    }
  } catch (err: any) {
    console.log("Error in signup controller", err.message);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid username or password" });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid username or password" });
    }

    generateToken(user.id, res);
    res.status(StatusCodes.OK).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (err: any) {
    console.log("Error in login controller", err.message);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
  } catch (err: any) {
    console.log("Error in logout controller", err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    res.status(StatusCodes.OK).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (err: any) {
    console.log("Error in getMe controller", err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};
