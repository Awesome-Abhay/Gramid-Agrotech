import { NextResponse } from "next/server";
import { dbFindAll } from "@lib/dbConnect";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category") || "All";

        let query = {};
        if (category !== "All") {
            query = { category };
        }

        const blogs = await dbFindAll("blogs", query);
        return new NextResponse(JSON.stringify({ blogs: blogs.result }), { status: 200 });

    } catch (error) {
        console.error("Error fetching blogs:", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
