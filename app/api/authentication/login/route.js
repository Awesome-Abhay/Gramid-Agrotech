import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { dbFind } from "@lib/dbConnect";

export async function POST(req) {
    const { email, password } = await req.json();
    const result = await dbFind("users", { email });
    if(result.ok === 0) {
        return new NextResponse(JSON.stringify({message: "No User Found", status: 500, user: null}), { status: 500 });
    }
    const match = await bcrypt.compare(password, result.result.password);
    if(!match) {
        return new NextResponse(JSON.stringify({message: "Invalid Password",status: 400, user: null}), { status: 400 });
    }
    return new NextResponse(JSON.stringify({message: "user logged in", status: 200, user: result}), { status: 200 })}