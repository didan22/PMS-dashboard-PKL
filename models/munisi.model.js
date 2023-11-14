import { Schema, model } from "mongoose";

const munisiSchema = new Schema(
  {
    munisi: {
      type: String,
      minLength: 4,
      required: true,
      unique: true,
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
);

export const MunisiModel = model("Munisi", munisiSchema);
