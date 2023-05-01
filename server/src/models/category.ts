import { Schema, model, Model, Types } from 'mongoose';
import Product from "./product"
import { IProduct } from './product';


interface ICategory {
  name: string;
  slug: string;
}

interface CategoryModel extends Model<ICategory> {
  findProducts(categoryId: Types.ObjectId): Promise<IProduct[]>;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});

categorySchema.statics.findProducts = async function (categoryId: Types.ObjectId) {
  const products = await Product.find({ category_ids: categoryId }).exec();
  return products;
};

export default model<ICategory, CategoryModel>('Category', categorySchema);


