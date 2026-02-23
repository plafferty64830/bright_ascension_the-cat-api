import axios from "axios";
import type { Response } from "../types/Response";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

type Favourite = {
    id: number;
    message: string;
} 

/**
 * 
 * @param id string
 * @returns A promise with the id of the cat that has been set as favourite
 */
export const setFavourite = async (id: string): Promise<Response<Favourite>> => {

    // make sure the apiKey and baseUrl has been defined and can be accessed
    if(apiKey === undefined || 
       apiKey === '' ||
       baseUrl === undefined ||
       baseUrl === ''
    ){
        return {
            status: 'failure',
            error: 'One of the required variables is missing: api key or base url'
        }
    }

    // if the id has not been supplied
    if(id === null || id === undefined){
        return {
            status: 'failure',
            error: 'The id for the cat to be set as favourite is missing'
        }
    }
    
    // use axios and perform the api request
    const {data: response} = await axios.post(
        `${baseUrl}/favourites`, 
        {image_id: id},
        {
            headers: {
                "x-api-key": apiKey
            }
        }
    );

    return {
        status: 'success',
        data: response
    }
}

/**
 * 
 * @param favouriteId 
 * @returns message confirming the action has been a success
 */
export const deleteFavourite = async (favouriteId: number): Promise<Response<Favourite>> => {

    // make sure the apiKey and baseUrl has been defined and can be accessed
    if(apiKey === undefined || 
       apiKey === '' ||
       baseUrl === undefined ||
       baseUrl === ''
    ){
        return {
            status: 'failure',
            error: 'One of the required variables is missing: api key or base url'
        }
    }

    // if the favouriteId has not been supplied
    if(favouriteId === null || favouriteId === undefined){
        return {
            status: 'failure',
            error: 'The favouriteId for the cat to be unset as favourite is missing'
        }
    }
    
    // use axios and perform the api request
    const {data: response} = await axios.delete(
        `${baseUrl}/favourites/${favouriteId}`, 
        {
            headers: {
                "x-api-key": apiKey
            }
        }
    );

    return {
        status: 'success',
        data: response
    }
}


