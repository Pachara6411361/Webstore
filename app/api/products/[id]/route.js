import Product from "../../../../models/Product";

export async function GET(req, { params }) {
  const { id } = params; // Extract the ID from the request parameters

  try {
    const product = await Product.findById(id); // Find the product by its ID

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        id: product._id,
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price,
        image: product.image,
        specs: product.specs,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Handle invalid ObjectId or other errors
    if (error.kind === "ObjectId") {
      return new Response(JSON.stringify({ message: "Invalid product ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Server Error", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, category, brand, price, image, specs } = await req.json(); // Extract fields from the request body

  try {
    const product = await Product.findById(id);
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (name) product.name = name;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (price) product.price = price;
    if (image) product.image = image;
    if (specs) product.specs = specs;

    await product.save(); // Save the updated product

    return new Response(
      JSON.stringify({ message: "Product updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Handle invalid ObjectId or other errors
    if (error.kind === "ObjectId") {
      return new Response(JSON.stringify({ message: "Invalid product ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Server Error", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params; // Extract the ID from the request parameters

  try {
    // Find the product by its ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Product deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Handle invalid ObjectId or other errors
    if (error.kind === "ObjectId") {
      return new Response(JSON.stringify({ message: "Invalid product ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Server Error", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
