import { createContext } from 'react'

type Location={
    location_name:string,
    location_state: string,
    consumption: number,
    appliances: number, 
}

type Context={
    API_URL:string,
    getLocations:Location[],
    handleGetLocations:any
}

export const GlobalContext=createContext<Context>({
    API_URL:"",
    getLocations:[
        {
            location_name:"",
            location_state: "",
            consumption: 0, 
            appliances: 0, 
        }
    ],
    handleGetLocations:()=>{}
})
