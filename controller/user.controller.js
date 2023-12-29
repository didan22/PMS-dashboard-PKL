import { UserModel } from "../models/user.model.js"
import inputValidation from "../utils/inputValidation.js"
import bcrypt from "bcrypt"
import { Types } from "mongoose"

const reqField = {
	username: "Username",
	fullname: "Nama Lengkap",
	password: "Password",
}

export const addUser = async function (req, res) {
	try {
		// Tangkap Input Dari User
		// username, fullname, email, password, role,
		const { username, fullname, email, password, role } = req.body

		const inputStatus = inputValidation(req.body, reqField)
		if (!inputStatus.valid) {
			return res.status(400).json({
				success: false,
				message: `${inputStatus.errMessage}Harus Diisi !`,
			})
		}

		const salt = 12
		const hashedPsw = await bcrypt.hash(password, salt)

		// Jika inputan user lengkap
		const user = new UserModel({
			username,
			fullname,
			email,
			password: hashedPsw,
			role,
		})

		const saved = await user.save()

		return res.status(201).json({
			success: true,
			message: "New User has been created !",
			data: saved,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message ?? "Backend Server Error !",
		})
	}
}

export const listUser = async function (req, res) {
	try {
		// Tangkap Get Data
		console.log("ada request")
		let { page, limit, search } = req.query
		let offset = 0
		page = page ? parseInt(page) : 1
		limit = limit ? parseInt(limit) : 10

		if (parseInt(limit) > 0) {
			offset = (parseInt(page) - 1) * limit
		}

		if (!search) search = ""
		const find = {
			$or: [
				{ username: { $regex: ".*" + search + ".*", $options: "i" } },
				{ fullname: { $regex: ".*" + search + ".*", $options: "i" } },
			],
		}

		const docs = await UserModel.countDocuments(find)
		const data = await UserModel.find(find).limit(limit).skip(offset)

		return res.status(200).json({
			success: true,
			message: "Request Valid !",
			totalData: docs,
			totalPage: Math.ceil(docs / limit),
			dataShownPerPage: limit,
			data,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message ?? "Backend Server Error !",
		})
	}
}

export const detailUser = async function (req, res) {
	try {
		// Tangkap Get Data
		const { id } = req.params

		if (!id) {
			return res.status(400).json({
				success: false,
				message: "ID kosong !",
			})
		}
		if (!Types.ObjectId.isValid(id.toString())) {
			return res.status(400).json({
				success: false,
				message: "ID tidak valid !",
			})
		}

		const data = await UserModel.findById(id)
		if (!data) {
			return res.status(400).json({
				success: false,
				message: "Data user tidak ditemukan !",
			})
		}

		return res.status(201).json({
			success: true,
			message: "Request Valid !",
			data,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message ?? "Backend Server Error !",
		})
	}
}

// update user
export const updateUser = async function (req, res) {
	try {
		const { id } = req.params // => req.params.id // const id = req.params.id

		if (!Types.ObjectId.isValid(id.toString())) {
			return res.status(400).json({
				success: false,
				message: "ID tidak valid !",
			})
		}

		const { username, fullname, email } = req.body
		const { password, ...validationField } = reqField

		// const validationField = {
		//   username: "Username",
		//   fullname: "Nama Lengkap",
		// }

		const inputStatus = inputValidation(req.body, validationField)
		if (!inputStatus.valid) {
			return res.status(400).json({
				success: false,
				message: `${inputStatus.errMessage}Harus Diisi !`,
			})
		}

		const currentUser = await UserModel.findById(id)
		if (!currentUser) {
			return res.status(400).json({
				success: false,
				message: "Data user tidak ditemukan !",
			})
		}

		currentUser.username = username
		currentUser.fullname = fullname
		if (email) currentUser.email = email
		const saved = await currentUser.save()

		return res.status(200).json({
			success: true,
			message: "Request Valid !",
			data: {
				user: saved,
			},
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message ?? "Backend Server Error !",
		})
	}
}
// delete user
export const deleteUser = async function (req, res) {
	try {
		// Tangkap Get Data
		const { id } = req.params

		if (!Types.ObjectId.isValid(id.toString())) {
			return res.status(400).json({
				success: false,
				message: "ID tidak valid !",
			})
		}

		await UserModel.findByIdAndDelete(id)

		return res.status(200).json({
			success: true,
			message: "User berhasil ter delete !",
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message ?? "Backend Server Error !",
		})
	}
}
