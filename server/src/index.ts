import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getCurrentUser, loginUser, registerUser } from "./controllers/auth";
import { createTweet, getTweets } from "./controllers/tweets";
import { createProfile } from "./controllers/profile";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Authorization
app.post("/api/register", registerUser);
app.post("/api/login", loginUser);
app.get("/api/getCurrentUser", getCurrentUser);

// Tweets
app.post("/api/createTweet", createTweet);
app.get("/api/getTweets", getTweets);

// Profile
app.post("/api/createProfile", createProfile);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
