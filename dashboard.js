import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import multer from "multer"

const app = express()
const AppPort = process.env.app_port
const ConnString = process.env.db_conn

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images")
	},
	filename: (req, file, cb) => {
		cb(null, new Date().getTime() + "-" + file.originalname)
	},
})

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg"
	) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

app.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).single("gambar")
)

// Input Configuration
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
mongoose
	.connect(ConnString)
	.then(() => {
		console.log("Backend server connected to MongoDB")
	})
	.catch(() => {
		console.log("Backend server can't connect to MongoDB")
	})

// Setup Root End Point
app.get("/", function (req, res) {
	return res.status(200).json({
		message: "Welcome to PMS Dashboard Backend Service",
		buildDate: "2023-11-09",
		serverTime: new Date(),
	})
})

import users from "./routes/users.js"
app.use("/users", users)

import munisi from "./routes/munisi.js"
app.use("/munisi", munisi)

import kontrak from "./routes/kontrak.js"
app.use("/kontrak", kontrak)

app.use("/images", express.static("./images"))

// Running Server
app.listen(AppPort, (error) => {
	if (error) {
		console.log("Backend Server is Error !")
	}

	console.log(`Backend Server run at port ${AppPort}`)
})
