import Product from "../../../models/Product";

export async function POST(req) {
  const { name, category, brand, price, image, specs } = await req.json(); // Get user details from the request body

  try {
    // Create a new product
    const product = new Product({
      name,
      category,
      brand,
      price,
      image,
      specs,
    });
    await product.save(); // Save the product in the database

    return new Response(
      JSON.stringify({ message: "Product created successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server Error", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req) {
  try {
    const products = await Product.find(); // Fetch all products from the database

    // Map each product and transform _id to id
    const transformedProducts = products.map((product) => ({
      id: product._id,
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      image: product.image,
      specs: product.specs,
    }));

    return new Response(JSON.stringify(transformedProducts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server Error", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
