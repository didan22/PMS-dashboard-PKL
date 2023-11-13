import express from "express";
import {
  addUser,
  deleteUser,
  detailUser,
  listUser,
  updateUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/", listUser);
router.get("/detail/:id", detailUser);
router.post("/", addUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
