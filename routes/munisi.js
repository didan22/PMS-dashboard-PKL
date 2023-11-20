import express from "express"
import {
	addMunisi,
	deleteMunisi,
	detailMunisi,
	listMunisi,
	updateMunisi,
} from "../controller/munisi.controller.js"

const router = express.Router()

router.get("/", listMunisi)
router.get("/detail/:id", detailMunisi)
router.post("/", addMunisi)
router.put("/update/:id", updateMunisi)
router.delete("/delete/:id", deleteMunisi)

export default router
