import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

const ExtraPriceSchema = new Schema({
  name: { type: String },
  price: { type: Number },
});

const MenuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    basePrice: { type: Number },
    category: { type: mongoose.Types.ObjectId },
    sizes: { type: [ExtraPriceSchema] },
    extraIngridients: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
