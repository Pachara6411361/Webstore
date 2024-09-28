import User from "../../../models/User";
import Product from "../../../models/Product";

export async function POST(req) {
  const { productId, quantity = 1 } = await req.json(); // Get product ID and quantity from the request body
  const userId = req.user.id; // Assume the user is authenticated, and req.user contains their data

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await User.findById(userId);

    // Check if the product is already in the cart
    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (cartItem) {
      // Product already in cart, increase the quantity
      cartItem.quantity += quantity;
    } else {
      // Add new product to the cart
      user.cart.push({ product: productId, quantity });
    }

    await user.save(); // Save the updated cart
    return new Response(JSON.stringify(user.cart), {
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

export async function GET(req) {
  const userId = req.user.id; // Assume the user is authenticated

  try {
    const user = await User.findById(userId).populate("cart.product"); // Populate the product details

    return new Response(JSON.stringify(user.cart), {
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
