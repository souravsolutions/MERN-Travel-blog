import { User } from "../models/user.model.js";
import { accessTokenOptions, refreshTokenOptions } from "../utils/jwt-options.js";

const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    console.log(req.body);

    const existingUser = await User.findOne({
      $or: [{ email: email }, { fullName: fullName }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or username already exists.",
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    await user.save();

    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    res.cookie("accessToken", accessToken, accessTokenOptions);

    // await emailSending({
    //   to: email,
    //   subject: "Welcome to OurApp!",
    //   html: getWelcomeTemplate(username),
    // });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
        location: "Not Found",
      });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Wrong Password",
        location: "Password",
      });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    await user.save();

    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    res.cookie("accessToken", accessToken, accessTokenOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findOne({ _id: id }).select(
      "-password -__v -refreshToken"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        code: "USER_NOT_FOUND",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Error in getUser:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      code: "SERVER_ERROR",
      error: error.message,
    });
  }
};

export { signUp, loginUser, getUser };
