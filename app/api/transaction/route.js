import { ObjectId } from 'mongodb';
import { dbConnect } from '@lib/dbConnect';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { userId, invoiceNo, sellerId, amountPaid, paymentDate, productId } = await req.json();

    try {
        const db = await dbConnect();

        const transaction = {
            invoiceNo,
            sellerId,
            amountPaid,
            productId,
            paymentDate: new Date(paymentDate),
        };

        // Update the user document: push the new transaction into the transactions array.
        const result = await db.collection('users').findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $push: { transactions: transaction } }, { returnDocument: 'after' }
        );
        if (result.modifiedCount === 0) {
            return new NextResponse(JSON.stringify({ message: 'User not found or transaction not added', status: 404, result: result }), {status: 404})
            
        }
        return new NextResponse(JSON.stringify({ message: 'Transaction stored successfully', status: 200, result }), {status: 200})
       
    } catch (error) {
        console.error('Error storing transaction:', error);
        return new NextResponse(JSON.stringify({ message: error, status: 500 }),
            { status: 500 });
    }
}