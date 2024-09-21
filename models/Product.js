// Keyboard Specs Schema
const keyboardSpecsSchema = new mongoose.Schema({
  type: { type: String }, // e.g., 'Mechanical', 'Hall Effect'
  size: { type: String } // e.g., 'Full Size', 'Tenkeyless', '60%'
}, { _id: false });

// Monitor Specs Schema
const monitorSpecsSchema = new mongoose.Schema({
  refreshRate: { type: String }, // e.g., '144Hz'
  size: { type: String } // e.g., '27"'
}, { _id: false });

// Mouse Specs Schema
const mouseSpecsSchema = new mongoose.Schema({
  wireless: { type: Boolean } // e.g., 'true', 'false'
}, { _id: false });

// Headset Specs Schema
const headsetSpecsSchema = new mongoose.Schema({
  wireless: { type: Boolean }, // e.g., 'true', 'false'
  surroundSound: { type: String } // e.g., '7.1', 'Stereo'
}, { _id: false });

// General Product Schema with specs based on category
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['keyboard', 'mouse', 'headset', 'monitor'], 
    required: true 
  },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  specs: {
    type: mongoose.Schema.Types.Mixed, // Flexible to accept different schemas
    required: true,
    validate: {
      validator: function(value) {
        switch (this.category) {
          case 'keyboard':
            return keyboardSpecsSchema.validateSync(value) === undefined;
          case 'monitor':
            return monitorSpecsSchema.validateSync(value) === undefined;
          case 'mouse':
            return mouseSpecsSchema.validateSync(value) === undefined;
          case 'headset':
            return headsetSpecsSchema.validateSync(value) === undefined;
          default:
            return true; // Default to true for categories that don't have strict validation
        }
      },
      message: props => `Invalid specs for category: ${props.category}`
    }
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;