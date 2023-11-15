import express from "express"
import {
	addKontrak,
	deleteKontrak,
	detailKontrak,
	listKontrak,
	updateKontrak,
} from "../controller/kontrak.controller.js"

const router = express.Router()

router.get("/", listKontrak)
router.get("/detail/:id", detailKontrak)
router.post("/", addKontrak)
router.put("/update/:id", updateKontrak)
router.delete("/delete/:id", deleteKontrak)

export default router
