import mongoose from "mongoose";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signin = async function (req, res) {
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
