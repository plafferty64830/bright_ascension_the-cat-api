import axios from "axios";
import type { Cat } from "../types/Cat";
import type { Response } from "../types/Response";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

/**
 * 
 * @param file File
 * @returns A promise with details of the uploaded cat or an error message
 */
export const uploadCat = async (file: File): Promise<Response<Cat>>=> {

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

    // if the file has not been supplied
    if(file === null || file === undefined){
        return {
            status: 'failure',
            error: 'The file provided is either invalid or missing'
        }
    }

    // create the formData and append the file to send to the cat api
    const formData = new FormData();
    formData.append("file", file);
    
    // use axios and perform the api request
    const {data: response} = await axios.post(
        `${baseUrl}/images/upload`, 
        formData,
        {
            headers: {
                'Content-Type': "multipart/form-data",
                "x-api-key": apiKey
            }
        }
    );

    return {
        status: 'success',
        data: response
    }
}

