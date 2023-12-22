import mongoose from "mongoose";

export const connectDB = async() => {
    try
    {
        await mongoose.connect("mongodb+srv://harris27061998:admin123@cluster0.zmzyzqn.mongodb.net/nextjsevents", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB Connected");
    }
    catch(error)
    {
        console.error("MongoDB connection error:", error);
        process.exit(1) // Exit process with failure.
    }
};

export const insertDocument = async (collect, doc) => {
    try
    {
        connectDB();
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
        connectDB();
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