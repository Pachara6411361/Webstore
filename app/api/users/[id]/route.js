import User from '../../../../models/User';

export async function GET(req) {
  const { id } = req.params; // Get user ID from the URL parameters

  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

import bcrypt from 'bcrypt';

export async function PUT(req) {
  const { id } = req.params; // Get user ID from the URL parameters
  const { name, password } = await req.json(); // Get new profile data from the request body

  try {
    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update the user's profile fields
    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10); // Hash the new password

    await user.save(); // Save the updated user

    return new Response(JSON.stringify({ message: 'Profile updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
