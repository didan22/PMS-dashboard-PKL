import { MunisiModel } from "../models/munisi.model.js"
import inputValidation from "../utils/inputValidation.js"
import { Types } from "mongoose"

const reqField = {
	nama: "Nama Munisi",
	kaliber: "Kaliber Munisi",
}

export const addMunisi = async function (req, res) {
	try {
		const inputStatus = inputValidation(req.body, reqField)
		if (!inputStatus.valid) {
			return res.status(400).json({
				success: false,
				message: `${inputStatus.errMessage}Harus Diisi !`,
			})
		}
		if (!req.file) {
			const err = new Error("gambar harus diisi")
			err.errorStatus = 244
			throw err
		}
		const nama = req.body.nama
		const gambar = req.file.path.replaceAll("\\", "/")
		console.log(gambar)
		const kaliber = req.body.kaliber
		// Jika inputan munisi lengkap
		const munisi = new MunisiModel({
			nama: nama,
			gambar: gambar,
			kaliber: kaliber,
		})

		const saved = await munisi.save()

		return res.status(201).json({
			success: true,
			message: "New Munisi has been created !",
			data: saved,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message ?? "Backend Server Error !",
		})
	}
}

export const listMunisi = async function (req, res) {
	try {
		// Tangkap Get Data
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
				{ nama: { $regex: ".*" + search + ".*", $options: "i" } },
				{ kaliber: { $regex: ".*" + search + ".*", $options: "i" } },
				{ gambar: { $regex: ".*" + search + ".*", $options: "i" } },
			],
		}

		const docs = await MunisiModel.countDocuments(find)
		const data = await MunisiModel.find(find).limit(limit).skip(offset)

		return res.status(201).json({
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

export const detailMunisi = async function (req, res) {
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

		const data = await MunisiModel.findById(id)
		if (!data) {
			return res.status(400).json({
				success: false,
				message: "Data munisi tidak ditemukan !",
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

export const updateMunisi = async function (req, res) {
	try {
		const { id } = req.params // => req.params.id // const id = req.params.id

		if (!Types.ObjectId.isValid(id.toString())) {
			return res.status(400).json({
				success: false,
				message: "ID tidak valid !",
			})
		}

		const { nama, kaliber, gambar } = req.body
		const { validationField } = reqField

		const inputStatus = inputValidation(req.body, reqField)
		if (!inputStatus.valid) {
			return res.status(400).json({
				success: false,
				message: `${inputStatus.errMessage}Harus Diisi !`,
			})
		}

		const currentMunisi = await MunisiModel.findById(id)
		if (!currentMunisi) {
			return res.status(400).json({
				success: false,
				message: "Data munisi tidak ditemukan !",
			})
		}

		currentMunisi.nama = nama
		currentMunisi.kaliber = kaliber
		currentMunisi.gambar = gambar
		const saved = await currentMunisi.save()

		return res.status(200).json({
			success: true,
			message: "Request Valid !",
			data: {
				munisi: saved,
			},
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message ?? "Backend Server Error !",
		})
	}
}

export const deleteMunisi = async function (req, res) {
	try {
		// Tangkap Get Data
		const { id } = req.params

		if (!Types.ObjectId.isValid(id.toString())) {
			return res.status(400).json({
				success: false,
				message: "ID tidak valid !",
			})
		}

		await MunisiModel.findByIdAndDelete(id)

		return res.status(200).json({
			success: true,
			message: "Munisi berhasil ter delete !",
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message ?? "Backend Server Error !",
		})
	}
}
