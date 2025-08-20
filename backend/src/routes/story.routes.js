import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import {
  addStory,
  allstory,
  getSingleStory,
  likeStory,
  userStory,
} from "../controllers/story.controller.js";
import upload from "../middlewares/multer-middleware.js";

const storyRoute = Router();

storyRoute
  .route("/addstory")
  .post(authMiddleware, upload.single("image"), addStory);
storyRoute.route("/allstory").get(authMiddleware, allstory);
storyRoute.route("/allstory/:id").get(authMiddleware, getSingleStory);
storyRoute.route("/allstory/:id/like").patch(authMiddleware, likeStory);
storyRoute.route("/userstory").get(authMiddleware, userStory);

export default storyRoute;
