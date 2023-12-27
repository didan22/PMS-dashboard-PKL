import express from "express";
import { signin } from "../controller/auth.controller.js";

const router = express.Router();

// Sign In
router.post("/signin", signin);

// Login
router.post("/login");

export default router;
