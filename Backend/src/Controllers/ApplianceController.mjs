import { db } from "../Models/index.mjs"

export const getAppliances = async (req, res) => {
    try {
        db.all(`SELECT * FROM appliances;` , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                console.log({appliances:data});
                res.status(200).json({appliances:data});
            };
        });
    } catch (error) {
        console.error("Error fetching appliances:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};