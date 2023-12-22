import { insertDocument } from "../../helpers/db-util";

const newsletter = async(req, res) => {
    if(req.method === "POST")
    {
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes("@"))
        {
            return res.status(422).json({message: "Invalid email address."});
        }

        try
        {
            const data = {email:userEmail};
            await insertDocument("newsletter", data);

            return res.status(201).json({message: "Signed up!"});
        }
        catch(error)
        {
            return res.status(500).json({message: "Oops! Internal Server Error"});
        }
    }

}

export default newsletter;