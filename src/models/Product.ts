import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVariant {
  id: string;
  color: string;
  colorCode: string;
  storage: string;
  mrp: number;
  price: number;
  image: string;
}

export interface IEMIPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  cashbackAmount: number;
  cashbackDescription: string;
  isPopular?: boolean;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  tag?: string;
  brand: string;
  category: string;
  description: string;
  variants: IVariant[];
  emiPlans: IEMIPlan[];
  createdAt: Date;
  updatedAt: Date;
}

const VariantSchema = new Schema<IVariant>(
  {
    id: { type: String, required: true },
    color: { type: String, required: true },
    colorCode: { type: String, required: true },
    storage: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { _id: false }
);

const EMIPlanSchema = new Schema<IEMIPlan>(
  {
    id: { type: String, required: true },
    tenureMonths: { type: Number, required: true },
    monthlyAmount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    cashbackAmount: { type: Number, default: 0 },
    cashbackDescription: { type: String, default: "" },
    isPopular: { type: Boolean, default: false },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    tag: { type: String, default: "" },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    variants: [VariantSchema],
    emiPlans: [EMIPlanSchema],
  },
  { timestamps: true }
);

// Prevent overwrite during hot-reloads
const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
