import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, requied: true, unique: true },
    slug: { type: String, requied: true, unique: true },
    image: { type: String, requied: true },
    brand: { type: String, requied: true },
    category: { type: String, requied: true },
    description: { type: String, requied: true },
    price: { type: Number, requied: true },
    countInStock: { type: Number, requied: true },
    rating: { type: Number, requied: true },
    numReviews: { type: Number, requied: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
