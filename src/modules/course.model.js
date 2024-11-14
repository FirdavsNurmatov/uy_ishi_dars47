import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      reqired: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", courseSchema);
