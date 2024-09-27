// models/Mouse.js
import mongoose from 'mongoose';

// Define the schema for Mouse products
const mouseSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // URL of the product image
    required: false,
  },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt fields

// Export the model, or use an existing one if already compiled
export default mongoose.models.Mouse || mongoose.model('Mouse', mouseSchema);
