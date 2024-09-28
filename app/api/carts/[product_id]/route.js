import User from '../../../../models/User';

export async function PUT(req) {
  const { productId, quantity } = await req.json(); // Get the product ID and new quantity from the request body
  const userId = req.user.id; // Assume the user is authenticated

  try {
    const user = await User.findById(userId);

    // Find the product in the cart
    const cartItem = user.cart.find(item => item.product.toString() === productId);

    if (!cartItem) {
      return new Response(JSON.stringify({ message: 'Product not found in cart' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update the quantity
    cartItem.quantity = quantity;

    await user.save(); // Save the updated cart
    return new Response(JSON.stringify(user.cart), {
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

import User from '../models/User';

export async function DELETE(req) {
  const { productId } = req.params; // Get product ID from URL parameters
  const userId = req.user.id; // Assume the user is authenticated

  try {
    const user = await User.findById(userId);

    // Filter out the product from the cart
    user.cart = user.cart.filter(item => item.product.toString() !== productId);

    await user.save(); // Save the updated cart
    return new Response(JSON.stringify(user.cart), {
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
