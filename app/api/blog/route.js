import { NextResponse } from "next/server";
import { dbFindAll, dbInsert } from "@lib/dbConnect";

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

export  async function POST(req) {
        const {
            title,
            description,
            category,
            date,
            author,
            image,
            content,
        } = await req.json();

        try {

            const blogPost = {
                title,
                description,
                category,
                date: new Date(date), // convert date string to Date object
                author,
                image, // storing the image URL (or binary data if processed differently)
                content,
                createdAt: new Date(),
            };

            // Insert the blog post document into the collection
            const result = await dbInsert("blogs", blogPost);

            return new NextResponse(JSON.stringify({
                message: "Blog post created successfully.",
                id: result.insertedId,
            }), {status: 200});

        } catch (error) {
            console.error("Error posting blogs:", error);
            return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
        }
}