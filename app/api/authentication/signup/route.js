import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

import { dbFind, dbInsert } from "@lib/dbConnect";

export async function POST(req) {
    const { name, email, password, state, city, zip, occupation, phone } = await req.json();
    const result = await dbFind("users", { email });
    if(result.ok===1) {
        return new NextResponse(JSON.stringify({message: "user already exists", status: 400}), { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const re = await dbInsert("users", { name, email, password: hashedPassword, state, city, zip, phone, transactions: [] });
    if(re.ok === 1) {
        return new NextResponse(JSON.stringify({message: "user created", status: 200}), { status: 200 });
    }

    return new NextResponse(JSON.stringify({message: "Some error occured", status: 200}), { status: 500 })
}