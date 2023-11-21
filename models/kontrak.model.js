import { Schema, model, ObjectId } from "mongoose"

export const TipeKontrak = ["PLN", "PDN"]

const kontrakSchema = new Schema(
	{
		tipe: {
			type: String,
			enum: TipeKontrak,
		},
		nomor: {
			type: String,
			minLength: 4,
			required: true,
		},
		stock: {
			type: String,
			minLength: 4,
			required: true,
		},
		jumlahpeti: {
			type: String,
			required: true,
		},
		munisi: {
			type: ObjectId,
			required: true,
			ref: "Munisi",
		},
	},
	{
		timestamps: true,
	}
)

export const KontrakModel = model("Kontrak", kontrakSchema)
