import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(403).json({ message: "Refresh token not found" });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }
        const user = await User.findOne({
          where: { username: decoded.username },
        });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const accessToken = jwt.sign(
          { username: user.username, role: user.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "5m" }
        );
        res.status(200).json({ accessToken: accessToken });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
