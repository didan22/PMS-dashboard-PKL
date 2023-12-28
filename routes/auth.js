import express from "express";
import { login, signup } from "../controller/auth.controller.js";

const router = express.Router();

// Sign In
router.post("/signup", signup);

// Login
router.post("/login", login);

export default router;
