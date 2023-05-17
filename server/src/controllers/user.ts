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
      include: { Profile: true, followers: true, following: true },
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
        include: { Profile: true, followers: true, following: true },
      });
    }

    const user = await prisma.user.findUnique({
      where: { username: String(username) },
      include: { Profile: true, followers: true, following: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isCurrentUser = loggedInUser?.username === user.username;
    const isFollowing = loggedInUser
      ? loggedInUser.following.some(
          (followingUser: any) => followingUser.id === user.id
        )
      : false;

    return res.status(200).json({ user, isCurrentUser, isFollowing });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const followUser = async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const { username }: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (!username) return res.status(401).json({ error: "Not authenticated" });

    const follower = await prisma.user.findUnique({
      where: { username: username as string },
    });

    if (!follower) return res.status(404).json({ error: "User not found" });

    const followingUsername = req.query.username;

    const following = await prisma.user.findUnique({
      where: { username: String(followingUsername) },
    });

    if (!following)
      return res.status(404).json({ error: "User to follow not found" });

    // Check if the follower is already following the user
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: follower.id,
        followingId: following.id,
      },
    });

    if (existingFollow) {
      // Delete the follow relationship
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });

      return res.status(200).json({
        success: true,
        message: "User unfollowed successfully",
        isFollowing: false,
      });
    }

    // Create a new follow relationship
    const newFollow = await prisma.follow.create({
      data: {
        follower: {
          connect: { id: follower.id },
        },
        following: {
          connect: { id: following.id },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "User followed successfully",
      isFollowing: true,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
