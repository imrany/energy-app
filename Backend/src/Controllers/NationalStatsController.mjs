import { db } from "../Models/index.mjs";

export const getNationalSources = async (req, res) => {
    try {
        db.all(`SELECT SUM(solar) AS solar,  SUM(gas) AS gas, SUM(coal) AS coal, SUM(wind) AS wind FROM sources;` , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                console.log({sources:data});
                res.status(200).json({sources:data});
            };
        });
    } catch (error) {
        console.error("Error fetching national sources:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};