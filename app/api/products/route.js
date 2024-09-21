import Product from '../models/Product'; // Assuming your model is stored in this path

// GET /products
export async function GET(req, res) {
  try {
    const products = await Product.find(); // Fetch all products from the database
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server Error', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
