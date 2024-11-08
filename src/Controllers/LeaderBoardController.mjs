import { db } from "../Models/index.mjs"

export const getLeaderboard = async(req, res) => {
    try {
        db.all(`SELECT location.location_state, sources.id, sources.wind, sources.solar, sources.gas, sources.coal FROM sources INNER JOIN location ON sources.location_name=location.location_name WHERE location.location_name=sources.location_name GROUP BY location.location_name, location.location_state;` , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                console.log({leaderboard:data});
                res.status(200).json({leaderboard:data});
            };
        });
    } catch (error) {
        console.log({error:error});
        res.status(500).send({error:`Error getting leader board: ${error}`});
    }
};

export const deleteLeaderboardEntry = async(req, res) => {
    try {
        const { id }=req.params
        db.all(`SELECT location_name FROM sources WHERE id=$1;`,[id] , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                console.log(data[0],id)
                let location_name=data[0].location_name
                db.run(`DELETE FROM sources WHERE id=$1;`,[id] , (error , data) => {
                    if(error){
                        console.log({error:error})
                        res.send({error:error})
                    }else{
                        db.run(`DELETE FROM appliances WHERE location_name=$1;`,[location_name] , (error , data) => {
                            if(error){
                                console.log({error:error})
                                res.send({error:error})
                            }else{
                                db.run(`DELETE FROM appliances WHERE location_name=$1;`,[location_name] , (error , data) => {
                                    if(error){
                                        console.log({error:error})
                                        res.send({error:error})
                                    }else{
                                        console.log({message:`Deleted successfully`});
                                        res.status(200).json({message:`Deleted successfully`});
                                    };
                                });
                            };
                        });
                    };
                });
            }
        })
    } catch (error) {
        console.log({error:error});
        res.status(500).send({error:`Error deletting leader board: ${error}`});
    }
};