import { Schema, models, model } from "mongoose";

// Keyboard Specs Schema
const keyboardSpecsSchema = {
  type: { type: String }, // e.g., 'Mechanical', 'Hall Effect'
  size: { type: String }, // e.g., 'Full Size', 'Tenkeyless', '60%'
};

// Monitor Specs Schema
const monitorSpecsSchema = {
  refreshRate: { type: String }, // e.g., '144Hz'
  size: { type: String }, // e.g., '27"'
};

// Mouse Specs Schema
const mouseSpecsSchema = {
  wireless: { type: Boolean }, // e.g., 'true', 'false'
};

// Headset Specs Schema
const headsetSpecsSchema = {
  wireless: { type: Boolean }, // e.g., 'true', 'false'
  surroundSound: { type: String }, // e.g., '7.1', 'Stereo'
};

// Custom validation function for `specs` based on `category`
function validateSpecs(specs, category) {
  switch (category) {
    case "keyboard":
      return Object.keys(keyboardSpecsSchema).every((key) => key in specs);
    case "monitor":
      return Object.keys(monitorSpecsSchema).every((key) => key in specs);
    case "mouse":
      return Object.keys(mouseSpecsSchema).every((key) => key in specs);
    case "headset":
      return Object.keys(headsetSpecsSchema).every((key) => key in specs);
    default:
      return false; // Invalid category
  }
}

// General Product Schema with specs based on category
const productSchema = new Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["keyboard", "mouse", "headset", "monitor"],
    required: true,
  },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  specs: {
    type: Schema.Types.Mixed, // Flexible to accept different schemas
    required: true,
    validate: {
      validator: function (value) {
        return validateSpecs(value, this.category);
      },
      message: (props) => `Invalid specs for category: ${props.value}`,
    },
  },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
