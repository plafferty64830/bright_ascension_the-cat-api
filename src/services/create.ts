import axios from "axios";
import type { Cat } from "../types/Cat";
import type { Response } from "../types/Response";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

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

    if(file === null || file === undefined){
        return {
            status: 'failure',
            error: 'The file provided is either invalid or missing'
        }
    }

    const formData = new FormData();
    formData.append("file", file);
    
    
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

