// models/Headset.js
import mongoose from 'mongoose';

// Define the schema for Headset products
const headsetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  wireless: {
    type: String,
    required: true,
    enum: ['Yes', 'No'], // Ensure the value is either 'Yes' or 'No'
  },
  surroundSound: {
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
export default mongoose.models.Headset || mongoose.model('Headset', headsetSchema);
