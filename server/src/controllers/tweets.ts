import { Request, Response } from "express";
import prisma from "../lib/prismaClient";
import jwt from "jsonwebtoken";

export const createTweet = async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const authorizationToken = req.headers.authorization?.split(" ")[1];
    if (!authorizationToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const { username }: any = jwt.verify(
      authorizationToken,
      process.env.JWT_SECRET!
    );
    if (!username) return res.status(401).json({ error: "Not authenticated" });

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    if (!req.body.description)
      return res.status(400).json({ error: "  Please fill all fields" });

    const { description } = req.body;

    const tweet = await prisma.tweet.create({
      data: {
        description,
        user: { connect: { id: user.id } },
      },
    });

    return res.status(201).json({ tweet, message: "Tweet created" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTweets = async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const tweets = await prisma.tweet.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({ tweets });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserTweets = async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { username } = req.query;

    if (!username)
      return res.status(400).json({ error: "Please provide a username" });

    const tweets = await prisma.tweet.findMany({
      where: {
        user: {
          username: username as string,
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({ tweets });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
