import mongoose from "mongoose";
import { UserModel } from "../models/user.model.js";
import inputValidation from "../utils/inputValidation.js"
import bcrypt from "bcrypt";

const reqField = {
	username: "Username",
	fullname: "Nama Lengkap",
	password: "Password",
}


export const signup = async function (req, res) {
  try {
    // Tangkap Input Dari User
    // username, fullname, email, password, role,
    const { username, fullname, email, password, role } = req.body;

    const inputStatus = inputValidation(req.body, reqField);
    if (!inputStatus.valid) {
      return res.status(400).json({
        success: false,
        message: `${inputStatus.errMessage}Harus Diisi !`,
      });
    }

    const salt = 12;
    const hashedPsw = await bcrypt.hash(password, salt);

    // Jika inputan user lengkap
    const user = new UserModel({
      username,
      fullname,
      email,
      password: hashedPsw,
      role,
    });

    const saved = await user.save();

    return res.status(201).json({
      success: true,
      message: "New User has been created !",
      data: saved,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message ?? "Backend Server Error !",
    });
  }
};

export const login = async function (req, res) {
	try {
		const data = await UserModel.findOne({username:req.body.username})
		if (!data) {
			return res.status(400).json({
				success: false,
				message: "Data user tidak ditemukan !",
			})
		}

    const isCorrect = await bcrypt.compare(req.body.password, data.password)
    if(!isCorrect) {
			return res.status(400).json({
				success: false,
				message: "Password Salah!",
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

