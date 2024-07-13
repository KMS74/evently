import mongoose, { Schema, Document, models } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
}

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = models.Category || mongoose.model("Category", categorySchema);

export default Category;
