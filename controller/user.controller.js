import { UserModel } from "../models/user.model.js"
import inputValidation from "../utils/inputValidation.js"

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
				message: inputStatus.errMessage,
			})
		}

		// Jika inputan user lengkap
		const user = new UserModel({
			username,
			fullname,
			email,
			password,
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
			message: "Backend Server Error !",
		})
	}
}
