import { Schema, model } from "mongoose"

export const UserRole = ["user", "admin", "maintainer"]

const userSchema = new Schema(
	{
		username: {
			type: String,
			minLength: 4,
			required: true,
			unique: true,
		},
		fullname: {
			type: String,
			minLength: 4,
			required: true,
		},
		email: {
			type: String,
			default: "",
		},
		emailVerificationStatus: {
			type: Boolean,
			default: false,
		},
		password: {
			type: String,
			minLength: 4,
			required: true,
		},
		role: {
			type: String,
			enum: UserRole,
			default: "user",
		},
	},
	{
		timestamps: true,
	}
)

export const UserModel = model("User", userSchema)
