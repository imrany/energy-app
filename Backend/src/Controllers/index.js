import { db } from "../sqlite"

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
                db.run(`INSERT INTO appliances (name, location_name,hours,quantity,watts) VALUES ($1, $2,$3,$4,$5) WHERE type='user';`,[name,location_name,hours,quantity,watts] , (error , data) => {
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