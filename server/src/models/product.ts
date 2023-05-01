import { Schema, model, Model, Types } from 'mongoose';

export interface IProduct {
    name: string;
    description: string;
    model: string;
    number: number;
    stock_quantity: number;
    initial_price: number;
    category_ids: Types.ObjectId[];
    image: string;
    popularity: number;
}

const productSchema = new Schema<IProduct>({
      name: { type: String, required: true },
      description: { type: String, required: true },
      model: { type: String, required: true },
      number: { type: Number, required: true },
      stock_quantity: { type: Number, required: true },
      initial_price: { type: Number, required: true },
      category_ids: [
        {
          type: Types.ObjectId,
          required: true,
          ref: 'Category'
        }
      ],
      image: { type: String, required: true },
      popularity: { type: Number, required: true }
});

interface ProductModel extends Model<IProduct> {
    search(query: string): Promise<IProduct[]>;
}

productSchema.statics.search = async function (query: string): Promise<IProduct[]> {
    const words = query.split(' ').map(w => `\\b${w}\\b`).join('|');
    const regex = new RegExp(words, 'i');
    // NOT SEPERATE WORDS const regex = new RegExp(`.*${query}.*`, 'i');
    // COMPLEX (FOR PARTIAL AND SEPERATE WORDS) const regex = new RegExp(`(${query.split(' ').join('|')})|(${query.split(' ').map(w => `(?=.*${w})`).join('')}${query.split(' ').map(w => `\\b${w}\\b`).join('')})`, 'i');
    return this.find({
        $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
        ],
    });
};

export default model<IProduct, ProductModel>('Product', productSchema);


