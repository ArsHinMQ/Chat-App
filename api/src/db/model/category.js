import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    icon: String
})

const Category = mongoose.model('Category', CategorySchema)
export default Category