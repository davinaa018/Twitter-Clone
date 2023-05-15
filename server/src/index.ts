import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loginUser, registerUser } from "./controllers/auth";
import { createTweet, getTweets, getUserTweets } from "./controllers/tweets";
import { createProfile } from "./controllers/profile";
import { getCurrentUser, getUserByUsername } from "./controllers/user";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Authorization
app.post("/api/register", registerUser);
app.post("/api/login", loginUser);

// User
app.get("/api/getCurrentUser", getCurrentUser);
app.get("/api/getUserByUsername", getUserByUsername);

// Tweets
app.post("/api/createTweet", createTweet);
app.get("/api/getTweets", getTweets);
app.get("/api/getUserTweets", getUserTweets);

// Profile
app.post("/api/createProfile", createProfile);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
