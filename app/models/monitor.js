// models/Monitor.js
import mongoose from 'mongoose';

// Define the schema for Monitor products
const monitorSchema = new mongoose.Schema({
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
  refreshRate: {
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
export default mongoose.models.Monitor || mongoose.model('Monitor', monitorSchema);
