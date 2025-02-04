import { NextResponse } from "next/server";
import { dbFindAll, dbInsert } from '@lib/dbConnect';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const arthi_id = searchParams.get("userId");

        let query = {};
        if (arthi_id) {
            query = { arthi_id };
        }

        const products = await dbFindAll("mandi", query);
        return new NextResponse(JSON.stringify({ products: products.result }), { status: 200 });

    } catch (error) {
        console.error("Error fetching products:", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}



export async function POST(req) {
  try {
    // Parse the incoming multipart/form-data
    const formData = await req.formData();

    // Extract text fields
    const district = formData.get("district");
    const mandi = formData.get("mandi");
    const productName = formData.get("productName");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const negotiable = formData.get("negotiable");
    const phone = formData.get("phone");
    const name = formData.get("name");
    const arthi_id = formData.get("arthi_id");

    // Extract the image file, if provided
    const imageFile = formData.get("image");
    let imageBase64 = null;
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      imageBase64 = Buffer.from(arrayBuffer).toString("base64");
    }

    // Create a new product object including the image data (if any)
    const newProduct = {
      district,
      mandi,
      productName,
      price,
      quantity,
      negotiable,
      phone,
      name,
      arthi_id,
      image: imageBase64, // this field will be null if no image was uploaded
    };

    // Insert the new product into the database
    const result = await dbInsert("mandi", newProduct);
    newProduct._id = result.insertedId;

    return new NextResponse(
      JSON.stringify({ product: newProduct, status: 200 }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return new NextResponse(JSON.stringify({ status: 500 }), { status: 500 });
  }
}