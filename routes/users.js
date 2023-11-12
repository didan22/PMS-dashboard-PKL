import express from "express";
import {
  addUser,
  detailUser,
  listUser,
  updateUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/", listUser);
router.get("/detail/:id", detailUser);
router.post("/", addUser);
router.put("/update/:id", updateUser);

export default router;
