import { TravelStory } from "../models/travelStory.model.js";

const addStory = async (req, res) => {
  try {
    const { title, story, visitedLocation, visitedDate, isFevourite, tags } =
      req.body;

    const userId = req.user.id;
    const imageUrl = req.file.path;

    if (!title || !story || !visitedDate) {
      return res.status(400).json({
        success: false,
        message: "Title, story and visited date are required.",
      });
    }

    const newStory = await TravelStory.create({
      title,
      story,
      visitedLocation,
      visitedDate,
      imageUrl,
      isFevourite,
      userId,
      tags,
      likes: [],
    });

    return res.status(201).json({
      success: true,
      message: "Travel story created successfully.",
      data: newStory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

const allstory = async (req, res) => {
  try {
    const stories = await TravelStory.find({})
      .populate("userId", "fullName ")
      .sort({ createdAt: -1 });

    if (!stories || stories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No travel stories found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User's travel stories fetched successfully.",
      data: stories,
    });
  } catch (error) {
    console.error("Error fetching user stories:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching stories.",
      error: error.message,
    });
  }
};

const getSingleStory = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await TravelStory.findById(id).populate(
      "userId",
      "fullName avatar email"
    );

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: story,
    });
  } catch (error) {
    console.error("Error fetching story:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const likeStory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const story = await TravelStory.findById(id).populate("userId", "fullName");
    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found" });
    }

    if (story.likes.includes(userId)) {
      story.likes = story.likes.filter(
        (uid) => uid.toString() !== userId.toString()
      );
    } else {
      story.likes.push(userId);
    }

    await story.save();

    return res.status(200).json({
      success: true,
      message: "Story like toggled successfully",
      data: story,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while toggling like",
      error: error.message,
    });
  }
};

const userStory = async (req, res) => {
  try {
    const userId = req.user.id;

    const stories = await TravelStory.find({ userId })
      .populate("userId", "fullName username")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message:
        stories.length > 0
          ? "User's travel stories fetched successfully."
          : "No travel stories found for this user.",
      data: stories,
    });
  } catch (error) {
    console.error("Error fetching user stories:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user stories.",
      error: error.message,
    });
  }
};

export const deleteStory = async (req, res) => {
  try {
    const story = await TravelStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (story.imagePublicId) {
      await cloudinary.uploader.destroy(story.imagePublicId);
    }

    await story.deleteOne();

    res.json({ success: true, message: "Story deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export { addStory, allstory, getSingleStory, likeStory, userStory, deleteStory };
