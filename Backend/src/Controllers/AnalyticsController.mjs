import { db } from "../Models/index.mjs"


export const getAnalyticsData = async (req, res) => {
    try {
        const { location_name }=req.params
        db.all('SELECT solar, gas, coal, wind FROM  sources where location_name=$1;',[location_name] , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                console.log({analytics:data});
                res.status(200).json({analytics:data});
            };
        });
    } catch (error) {
        console.error({error:`Error loading analytics: ${error}`});
        res.status(500).send({error:`Error loading analytics: ${error}`});
    }
};