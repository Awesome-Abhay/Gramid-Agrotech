import { NextResponse } from "next/server";
import { dbConnect } from '@lib/dbConnect';
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
    const { id } = await params;
    const { district, mandi, productName, price, quantity, negotiable } = await req.json();

    try {
        const db = await dbConnect();
        const result = await db.collection("mandi").findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { district, mandi, productName, price, quantity, negotiable } },
            { returnDocument: "after" }
        );
        return new NextResponse(JSON.stringify({result: result.value, status: 200}), { status: 200 });

    } catch (error) {
        console.error("Error updating product:", error);
        return new NextResponse(JSON.stringify({ status: 500 }), { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = await params;

  try {
    const db = await dbConnect();
    const result = await db.collection("mandi").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
        return new NextResponse(JSON.stringify({ error: "Product not found", status: 404 }), { status: 404 });
    }
    return new NextResponse(JSON.stringify({ status: 200 }), { status: 200 });
  } 
  catch (error) {
    console.error("Error deleting product:", error);
    return new NextResponse(JSON.stringify({ status: 500 }), { status: 500 });
  }
}