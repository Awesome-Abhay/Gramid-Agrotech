import { NextResponse } from "next/server";
import { dbFindAll } from '@lib/dbConnect'

export async function POST(req) {
    const { district, product } = await req.json();
    const query = { district, productName: product };
    const result = await dbFindAll("mandi", query);
    if (result.ok === 0) {
        return new NextResponse(JSON.stringify({status: 500, body: "Failed to fetch data from the database."}) , {status: 500 });
    }
    return new NextResponse(JSON.stringify({result: result, status: 200}) , { status: 200 });
}