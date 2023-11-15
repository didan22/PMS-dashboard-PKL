import { KontrakModel } from "../models/kontrak.model.js"
import inputValidation from "../utils/inputValidation.js"
import { Types } from "mongoose"

const reqField = {
	tipe: "Tipe",
	nomor: "Nomor",
	stock: "Stock",
	jumlahpeti: "Jumlah Peti",
}

export const addKontrak = async function (req, res) {
	try {
		const { tipe, nomor, stock, jumlahpeti } = req.body

		const inputStatus = inputValidation(req.body, reqField)
		if (!inputStatus.valid) {
			return res.status(400).json({
				success: false,
				message: `${inputStatus.errMessage}Harus Diisi !`,
			})
		}

		// Jika inputan munisi lengkap
		const kontrak = new KontrakModel({
			tipe,
			nomor,
			stock,
			jumlahpeti,
		})

		const saved = await kontrak.save()

		return res.status(201).json({
			success: true,
			message: "New Kontrak has been created !",
			data: saved,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message ?? "Backend Server Error !",
		})
	}
}

export const listKontrak = async function (req, res) {
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
				{ tipe: { $regex: ".*" + search + ".*", $options: "i" } },
				{ nomor: { $regex: ".*" + search + ".*", $options: "i" } },
				{ stock: { $regex: ".*" + search + ".*", $options: "i" } },
				{ jumlahpeti: { $regex: ".*" + search + ".*", $options: "i" } },
			],
		}

		const docs = await KontrakModel.countDocuments(find)
		const data = await KontrakModel.find(find).limit(limit).skip(offset)

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

export const detailKontrak = async function (req, res) {
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

		const data = await KontrakModel.findById(id)
		if (!data) {
			return res.status(400).json({
				success: false,
				message: "Data kontrak tidak ditemukan !",
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

export const updateKontrak = async function (req, res) {
	try {
		const { id } = req.params // => req.params.id // const id = req.params.id

		if (!Types.ObjectId.isValid(id.toString())) {
			return res.status(400).json({
				success: false,
				message: "ID tidak valid !",
			})
		}

		const { tipe, nomor, stock, jumlahpeti } = req.body
		const { validationField } = reqField

		// const validationField = {
		//   username: "Username",
		//   fullname: "Nama Lengkap",
		// }

		const inputStatus = inputValidation(req.body, reqField)
		if (!inputStatus.valid) {
			return res.status(400).json({
				success: false,
				message: `${inputStatus.errMessage}Harus Diisi !`,
			})
		}

		const currentKontrak = await KontrakModel.findById(id)
		if (!currentKontrak) {
			return res.status(400).json({
				success: false,
				message: "Data kontrak tidak ditemukan !",
			})
		}

		currentKontrak.tipe = tipe
		currentKontrak.nomor = nomor
		currentKontrak.stock = stock
		currentKontrak.jumlahpeti = jumlahpeti
		const saved = await currentKontrak.save()

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

export const deleteKontrak = async function (req, res) {
	try {
		// Tangkap Get Data
		const { id } = req.params

		if (!Types.ObjectId.isValid(id.toString())) {
			return res.status(400).json({
				success: false,
				message: "ID tidak valid !",
			})
		}

		await KontrakModel.findByIdAndDelete(id)

		return res.status(200).json({
			success: true,
			message: "Kontrak berhasil ter delete !",
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message ?? "Backend Server Error !",
		})
	}
}
