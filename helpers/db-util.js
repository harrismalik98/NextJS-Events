import mongoose from "mongoose";

export const connectDB = async() => {
    try
    {
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("MongoDB Connected");
    }
    catch(error)
    {
        console.error("MongoDB connection error:", error);
    }
};

export const insertDocument = async (collect, doc) => {
    try
    {
        await connectDB();
        const db = mongoose.connection;
        const collection = db.collection(collect);
        const result = await collection.insertOne(doc);
        return result;
    }
    catch(error)
    {
        console.error("Failed to add data to the database.", error);
    }
}

export const getAllDocuments = async (collect, findBy, sort) => {
    try
    {
        await connectDB();
        const db = mongoose.connection;
        const collection = db.collection(collect);
        const result = await collection.find(findBy).sort(sort).toArray();
        return result;
    }
    catch(error)
    {
        console.error("Failed to receive documents from database", error);
    }
}