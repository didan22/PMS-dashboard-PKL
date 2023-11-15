import { Schema, model } from "mongoose"

export const UserRole = ["user", "admin", "maintainer"]

const munisiSchema = new Schema(
	{
		nama: {
			type: String,
			minLength: 4,
			required: true,
		},
		kaliber: {
			type: String,
			minLength: 4,
			required: true,
		},
		gambar: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export const MunisiModel = model("Munisi", munisiSchema)
