import { NextResponse } from "next/server";
import { dbInsert, dbFindAll } from "@lib/dbConnect";


export async function GET(req) {
  try {

    let query = {};

    const reels = await dbFindAll("reel", query);
    return new NextResponse(
      JSON.stringify({ reels: reels.result }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching reels:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export  async function POST(req) {
        const {
            title,
            description,
            videoUrl,
        } = await req.json();

        try {

            const blogPost = {
                title,
                description,
                videoUrl,
                createdAt: new Date(),
            };

            // Insert the blog post document into the collection
            const result = await dbInsert("reel", blogPost);

            return new NextResponse(JSON.stringify({
                message: "reel post created successfully.",
                id: result.insertedId,
            }), {status: 200});

        } catch (error) {
            console.error("Error posting reels:", error);
            return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
        }
}