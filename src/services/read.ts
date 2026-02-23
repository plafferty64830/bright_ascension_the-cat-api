import axios from "axios";
import type { Cat } from "../types/Cat";
import type { Response } from "../types/Response";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

export const readCats = async (): Promise<Response<Cat[]>> => {
    
    // make sure the apiKey and baseUrl has been defined and can be accessed
    if (apiKey === undefined ||
        apiKey === '' ||
        baseUrl === undefined ||
        baseUrl === ''
    ) {
        return {
            status: 'failure',
            error: 'One of the required variables is missing: api key or base url'
        }
    }

    // perform the axios get request to get the images uploaded by the current user
    const { data: images } = await axios.get(
        `${baseUrl}/images/`,
        {
            headers: {
                "x-api-key": apiKey
            },
            params: {
                limit: 10
            }
        }
    );

    return {
        status: 'success',
        data: images
    }
}

