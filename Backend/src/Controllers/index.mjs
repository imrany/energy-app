import { db } from "../sqlite/index.mjs"

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

export const getLocations = async(req, res) => {
    try {
        db.all(`SELECT location.location_name, location.location_state, COUNT(appliances.name) AS appliances,  SUM(appliances.quantity) AS total_quantity,  SUM( appliances.watts) AS total_watts, SUM(appliances.hours) AS total_hours FROM appliances INNER JOIN location ON appliances.location_name=location.location_name WHERE location.location_name=appliances.location_name GROUP BY location.location_name, location.location_state;` , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                let locations=[]
                data.forEach(({
                    location_name,
                    location_state,
                    consumption,
                    appliances,
                    total_hours,
                    total_quantity,
                    total_watts
                })=>{
                    let item={
                        location_name,
                        location_state,
                        consumption:(total_watts*total_hours)/24,
                        appliances
                    }
                    locations.push(item)
                })
                console.log(data);
                res.status(200).json({locations});
            };
        });
    } catch (error) {
        console.log({error:error});
        res.status(500).send({error:`Error getting locations: ${error}`});
    }
};
  
export const createLocation = async(req, res) => {
    try {
        const { location_name, location_state, appliances } = req.body;
        db.run(`INSERT INTO location (location_name, location_state)
                SELECT $1, $2
                WHERE NOT EXISTS (
                    SELECT 1 
                    FROM location 
                    WHERE location_name = $1 AND location_state=$2
                );
            `,[location_name,location_state] , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                let randomNum=Math.random()
                let wind=randomNum+1290
                let solar=randomNum+128
                let coal=randomNum+900
                let gas=randomNum+2000
                if(appliances!==undefined){
                    const { name, hours, quantity, watts }=appliances
                    db.run(`INSERT INTO appliances (name, location_name,hours,quantity,watts) VALUES ($1, $2,$3,$4,$5);`,[name,location_name,hours,quantity,watts] , (error , data) => {
                        if(error){
                            console.log({error:error})
                            res.send({error:error})
                        }else{
                            db.run(`INSERT INTO sources (wind, location_name,solar,coal,gas) VALUES ($1, $2,$3,$4,$5);`,[wind, location_name,solar,coal,gas] , (error , data) => {
                                if(error){
                                    console.log({error:error})
                                    res.send({error:error})
                                }else{
                                    console.log({message:`Source saved`});
                                };
                            });
                            console.log({message:`Location and appliances saved`});
                            res.status(200).json({message:`Location and appliances saved`});
                        };
                    });
                }else{
                    db.run(`INSERT INTO sources (wind, location_name,solar,coal,gas) VALUES ($1, $2,$3,$4,$5);`,[wind, location_name,solar,coal,gas] , (error , data) => {
                        if(error){
                            console.log({error:error})
                            res.send({error:error})
                        }else{
                            console.log({message:`Source saved`});
                        };
                    });
                    console.log({message:`Location saved`});
                    res.status(200).json({message:`Location saved`});
                }
            };
        });
    } catch (error) {
        console.log({error:error});
        res.status(500).send({error:`Error creating a new location: ${error}`});
    }
};

export const updateLocation = async(req, res) => {
    try {
        const { previous_location_name }=req.params;
        const { location_name, location_state, appliances } = req.body;
        const {quantity, hours, name}=appliances
        db.run(`UPDATE location SET location_name = $1, location_state = $2 WHERE location_name=$3;`,[location_name,location_state,previous_location_name] , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                db.run(`UPDATE appliances SET name=$1, quantity=$2, hours=$3, location_name=$4 WHERE location_name=$5;`,[name,quantity, hours, location_name,previous_location_name] , (error , data) => {
                    if(error){
                        console.log({error:error})
                        res.send({error:error})
                    }else{
                        db.run(`UPDATE sources SET location_name=$1 WHERE location_name=$2;`,[location_name,previous_location_name] , (error , data) => {
                            if(error){
                                console.log({error:error})
                                res.send({error:error})
                            }else{
                                console.log({message:`Location updated`});
                                res.status(200).json({message:`Location updated`});
                            };
                        });
                    };
                });
            };
        });
    } catch (error) {
        console.log({error:error});
        res.status(500).send({error:`Error updating this location: ${error}`});
    }
};

export const deleteLocation = async(req, res) => {
    try {
        const { location_name }=req.params
        db.run(`DELETE FROM sources WHERE location_name=$1;`,[location_name] , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                db.run(`DELETE FROM appliances WHERE location_name=$1;`,[location_name] , (error , data) => {
                    if(error){
                        console.log({error:error})
                        res.send({error:error})
                    }else{
                        db.run(`DELETE FROM location WHERE location_name=$1;`,[location_name] , (error , data) => {
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
        })
    } catch (error) {
        console.log({error:error});
        res.status(500).send({error:`Error deletting leader board: ${error}`});
    }
};

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