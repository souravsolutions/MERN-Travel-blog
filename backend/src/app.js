import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import storyRoute from "./routes/story.routes.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/hello", async (req, res) => {
  return res.status(200).json({ message: "Hello" });
});

app.use("/api/v1/auth",userRouter)
app.use("/api/v1/stories",storyRoute)

export default app;
