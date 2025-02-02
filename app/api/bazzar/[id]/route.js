import { NextResponse } from "next/server";
import { dbFindID } from "@lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
    const {id} = await params;
    
    if (!ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const item = await dbFindID("bazzar", id);

    if (item.ok === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(item.result);
}
