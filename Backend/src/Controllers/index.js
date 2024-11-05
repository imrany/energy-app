import { db } from "../sqlite/index.js"

export const loadAnalytics = async (req, res) => {
    try {
        db.all('SELECT name, watts FROM  appliances;' , (error , data) => {
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

export const getAnalyticsData = async (req, res) => {
    try {
        const { location_name,timeRange }=req.params
        db.all('SELECT name, watts FROM  appliances where location_name=$1, hours=$2;',[location_name,timeRange] , (error , data) => {
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

export const getAppliances = async (req, res) => {
    try {
        db.all('SELECT * FROM  appliances;' , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                console.log({appliances:data});
                res.status(200).json({appliances:data});
            };
        });
    } catch (error) {
        console.error({error:`Error getting appliance: ${error}`});
        res.status(500).send({error:`Error getting appliance: ${error}`});
    }
};

export const getLocations = async(req, res) => {
    try {
        db.all(`SELECT location_name, location_state, appliances FROM  location WHERE type='user';` , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                console.log({location:data});
                res.status(200).json({location:data});
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
        const { name, hours, quantity, watts }=appliances
        db.run(`INSERT INTO location (location_name, location_state) VALUES ($1, $2) WHERE type='user';`,[location_name,location_state] , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                db.run(`INSERT INTO appliances (name, location_name,hours,quantity,watts) VALUES ($1, $2,$3,$4,$5);`,[name,location_name,hours,quantity,watts] , (error , data) => {
                    if(error){
                        console.log({error:error})
                        res.send({error:error})
                    }else{
                        console.log({message:`Location saved`});
                        res.status(200).json({message:`Location saved`});
                    };
                });
            };
        });
    } catch (error) {
        console.log({error:error});
        res.status(500).send({error:`Error creating a new location: ${error}`});
    }
};

export const updateLocation = async(req, res) => {
    try {
        const { id }=req.params;
        const { location_name, location_state, appliances } = req.body;
        db.run(`UPDATE location SET location_name = $1, location_state = $2 WHERE type='user' && id=$3;`,[location_name,location_state,id] , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                db.run(`UPDATE appliances SET location_name=$2 WHERE name=$1;`,[appliances.name,location_name] , (error , data) => {
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
    } catch (error) {
        console.log({error:error});
        res.status(500).send({error:`Error updating this location: ${error}`});
    }
};

export const getLeaderboard = async(req, res) => {
    try {
        db.all(`SELECT location_name, location_state, appliances FROM  location WHERE type='user';` , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                // const leaderboard = locations.map(location => ({
                //     locationName: location.name,
                //     totalEnergy: LeaderboardModel.calculateTotalEnergy(location)
                // }));

                console.log({leaderboard:data});

                // res.status(200).json({

                // });
            };
        });
    } catch (error) {
        console.log({error:error});
        res.status(500).send({error:`Error getting leader board: ${error}`});
    }
};

export const deleteLeaderboardEntry = async(req, res) => {
    try {
        const { location_name }=req.params
        db.run(`DELETE FROM location WHERE location_name=$1;`,[location_name] , (error , data) => {
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
    } catch (error) {
        console.log({error:error});
        res.status(500).send({error:`Error deletting leader board: ${error}`});
    }
};

export const getNationalSources = async (req, res) => {
    try {
        db.all(`SELECT * FROM sources;` , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                console.log({sources:data});
                res.status(200).json({sources:data});
            };
        });
        const sources = await NationalSourceModel.getAll();
        res.json(sources);
    } catch (error) {
        console.error("Error fetching national sources:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createNationalSources = async (req, res) => {
    try {
        const { location_state, coal, gas, wind, solar } = req.body;
        db.run(`INSERT INTO sources (location_state, coal, gas, wind, solar) VALUES ($1, $2, $3, $4, $5);`,[location_state,coal, gas, wind, solar] , (error , data) => {
            if(error){
                console.log({error:error})
                res.send({error:error})
            }else{
                console.log({message:`Source saved`});
                res.status(200).json({message:`Source saved`});
            };
        });
    } catch (error) {
        console.log({error:error});
        res.status(500).send({error:`Error creating a new source: ${error}`});
    }
};