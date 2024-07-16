import express from "express";
import {
  getUsers,
  getUserById,
  register,
  login,
  logout,
  getUserLogin,
} from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/users", register);
router.post("/login", login);
router.get("/token", refreshToken);
router.get("/me", getUserLogin);
router.delete("/logout", logout);

export default router;
