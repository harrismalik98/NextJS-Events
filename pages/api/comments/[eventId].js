import { getAllDocuments, insertDocument } from "../../../helpers/db-util";

const eventId = async(req, res) => {
    const eventId = req.query.eventId;

    if(req.method === "POST")
    {
        const {name, email, text} = req.body;

        if(!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "" )
        {
            return res.status(422).json({message: "Invalid input"});
        }

        const newComment = {
            name, email, text ,eventId
        }

        try
        {
            await insertDocument("comment", newComment);
            return res.status(201).json({message: "Comment added successfully."})
        }
        catch(error)
        {
            return res.status(500).json({message: "Oops! Internal Server Error"});
        }
    }

    if(req.method === "GET")
    {
        try
        {
            const comments = await getAllDocuments("comment", {eventId}, { _id: -1 });
            return res.status(200).json({comments});
        }
        catch(error)
        {
            return res.status(500).json({message: "Oops! Internal Server Error"});
        }
    }
}

export default eventId;