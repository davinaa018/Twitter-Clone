import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prismaClient";

export const createProfile = async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const authorizationToken = req.headers.authorization?.split(" ")[1];
    if (!authorizationToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const { bio, location, website } = req.body;
    if (!bio || !location || !website) {
      return res.status(400).json({ error: "Fields cannot be empty" });
    }
    const { username }: any = jwt.verify(
      authorizationToken,
      process.env.JWT_SECRET!
    );

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user.id;

    const profileExists = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (profileExists) {
      return res.status(400).json({ error: "Profile already exists" });
    }

    const profile = await prisma.profile.create({
      data: {
        bio,
        location,
        website,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return res
      .status(201)
      .json({ profile, message: "Profile created successfully" });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
