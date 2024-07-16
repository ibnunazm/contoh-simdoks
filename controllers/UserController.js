import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "role"],
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "username", "role"],
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      username: username,
      password: hashedPassword,
      role: role,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { username: user.username, role: user.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    await User.update(
      { refresh_token: refreshToken },
      { where: { username: username } }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });
    res
      .status(200)
      .json({ id: user.id, username, password, accessToken: accessToken, refreshToken:refreshToken });
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    await User.update(
      { refreshToken: null },
      { where: { refreshToken: refreshToken } }
    );
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserLogin = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findOne({
      where: { username: decodedToken.username },
      attributes: ["id", "username", "role"],
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
