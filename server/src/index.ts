import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loginUser, registerUser } from "./controllers/auth";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/register", registerUser);
app.post("/api/login", loginUser);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
