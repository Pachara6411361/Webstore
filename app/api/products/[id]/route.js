import Product from '../models/Product';

// GET /products/:id
export async function GET(req, res) {
  const { id } = req.params; // Extract the ID from the request parameters

  try {
    const product = await Product.findById(id); // Find the product by its ID

    if (!product) {
      return new Response(JSON.stringify({ message: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Handle invalid ObjectId or other errors
    if (error.kind === 'ObjectId') {
      return new Response(JSON.stringify({ message: 'Invalid product ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ message: 'Server Error', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
