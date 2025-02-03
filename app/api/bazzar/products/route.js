import { dbInsert } from '@lib/dbConnect'
import { NextResponse } from 'next/server'
export async function POST(req) {
      const {
        name,
        category,
        price,
        description,
        image,
        stock,
        rating,
        reviews,
        createdAt,
        seller_id,
      } = await req.json();

      try {
  
        const product = {
          name,
          category,
          price, // assumed to be a number from the frontend payload
          description,
          image,
          stock,
          rating,
          reviews,
          createdAt: new Date(createdAt),
          seller_id,
          publishedAt: new Date(), // record when the product was published
        };
  
        const result = await dbInsert("bazzar", product)
  
        return new NextResponse(JSON.stringify({ products: result, status: 200 }), { status: 200 });
      }catch (error) {
        console.error("Error posting products:", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }

  }