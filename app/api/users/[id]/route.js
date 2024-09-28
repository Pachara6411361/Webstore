import User from "../../../../models/User";
import bcrypt from "bcrypt";

export async function GET(req, { params }) {
  const { id } = params; // Get user ID from the URL parameters

  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params; // Get user ID from the URL parameters
  const { name, password } = await req.json(); // Get new profile data from the request body

  try {
    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update the user's profile fields
    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10); // Hash the new password

    await user.save(); // Save the updated user

    return new Response(
      JSON.stringify({ message: "Profile updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params; // Get user ID from the URL parameters

  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await user.deleteOne(); // Delete the user

    return new Response(
      JSON.stringify({ message: "User deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
