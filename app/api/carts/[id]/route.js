import User from "../../../../models/User";
import Cart from "../../../../models/Cart";
import Product from "../../../../models/Product";

export async function POST(req, { params }) {
  const { id: userId } = params; // Extract the ID from the request parameters
  const { productId, quantity = 1 } = await req.json(); // Get product ID and quantity from the request body

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if the user already has a cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        user,
        items: [{ product: productId, quantity }],
      });
    } else {
      // Check if the product is already in the cart
      const cartItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (cartItem) {
        // Product already in cart, increase the quantity
        cartItem.quantity += quantity;
      } else {
        // Add new product to the cart
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save(); // Save the updated cart
    return new Response(
      JSON.stringify({ message: "Cart updated successfully" }),
      {
        status: 200,
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

export async function GET(req, { params }) {
  const { id } = params; // Extract the ID from the request parameters

  try {
    const cart = await Cart.findOne({ user: id });

    if (!cart) {
      return new Response(JSON.stringify({ message: "Cart not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Map each product and transform _id to id
    const transformedItems = cart.items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    return new Response(
      JSON.stringify({
        id: cart._id,
        user: cart.user,
        items: transformedItems,
      }),
      {
        status: 200,
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

export async function DELETE(req, { params }) {
  const { id: userId } = params; // Extract the ID from the request parameters
  const { productId } = await req.json(); // Get product ID from URL parameters

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return new Response(JSON.stringify({ message: "Cart not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Filter out the product from the cart
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save(); // Save the updated cart
    return new Response(
      JSON.stringify({ message: "Cart updated successfully" }),
      {
        status: 200,
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
