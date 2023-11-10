import express from "express"
import { addUser, detailUser, listUser } from "../controller/user.controller.js"

const router = express.Router()

router.get("/", listUser)
router.get("/detail/:id", detailUser)
router.post("/", addUser)

export default router
