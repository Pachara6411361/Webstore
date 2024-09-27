// models/Keyboard.js
import mongoose from 'mongoose';

// Define the schema for Keyboard products
const keyboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // URL of the product image
    required: false,
  },
}, { timestamps: true });

// Export the model, or use an existing one if already compiled
export default mongoose.models.Keyboard || mongoose.model('Keyboard', keyboardSchema);
