import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prismaClient";

export const getCurrentUser = async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const { username }: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (!username) return res.status(401).json({ error: "Not authenticated" });

    const user = await prisma.user.findUnique({
      where: { username },
      include: { Profile: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ user });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { username } = req.query;
    const token = req.headers.authorization?.split(" ")[1];
    let loggedInUser: any;

    if (!token) {
      loggedInUser = null;
    } else {
      const { username }: any = jwt.verify(token, process.env.JWT_SECRET!);
      loggedInUser = await prisma.user.findUnique({
        where: { username },
        include: { Profile: true },
      });
    }

    const user = await prisma.user.findUnique({
      where: { username: String(username) },
      include: { Profile: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isCurrentUser = loggedInUser.username === user.username;

    return res.status(200).json({ user, isCurrentUser });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
