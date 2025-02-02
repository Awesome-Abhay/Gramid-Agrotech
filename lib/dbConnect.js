import { MongoClient, ObjectId } from 'mongodb';

let client;
let db;

export const dbConnect = async () => {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        db = client.db("agro-tech");
    }

    return db;
};

export const dbInsert = async (collection, data) => {
    try {
        const db = await dbConnect();
        const result = await db.collection(collection).insertOne(data);
        return {result: result, ok: 1};
    }catch(err) {
        console.log(err);
        return { error: err, ok: 0 };
    }
}

export const dbFind = async (collection, query) => {
    try {
        const db = await dbConnect();
        const result = await db.collection(collection).findOne(query);
        if(!result) {
            return {message: 'No user', ok: 0};
        }
        return {result: result, ok: 1};
    }catch(err) {
        console.log(err);
        return { error: err, ok: 0 };
    }
}

export const dbFindAll = async (collection, query) => {
    try {
        const db = await dbConnect();
        const result = await db.collection(collection).find(query).toArray();
        if (result.length === 0) {
            return { message: "No blogs found", ok: 0, result: [] };
        }
        return { result, ok: 1 };
    } catch (err) {
        console.log(err);
        return { error: err, ok: 0 };
    }
}

export const dbFindID = async (collectionName, id) => {
    try {
        const db = await dbConnect();
        const result = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });

        if (!result) {
            return { message: "No product found", ok: 0 };
        }

        return { result, ok: 1 };
    } catch (err) {
        console.error("Database error:", err);
        return { error: err.message, ok: 0 };
    }
};