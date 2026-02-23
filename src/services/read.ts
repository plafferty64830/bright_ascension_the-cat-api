import axios from "axios";
import type { Cat } from "../types/Cat";
import type { Response } from "../types/Response";
import { getVotes } from "./vote";

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

    // first retrieve all votes for the uploaded cats
    const {data: votes} = await getVotes();

    // perform the axios get request to get the images uploaded by the current user
    const response = await axios.get(
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

    // make sure the favourite object is consistently returned with a valid isFavourite key
    const images = response.data.map((cat: Cat) => ({
        ...cat,
        favourite: cat.favourite?.id
            ? { id: cat.favourite.id, isFavourite: true }
            : { id: null, isFavourite: false },
        votes: votes?.find((v) => v.image_id === cat.id)?.vote_count
    }));

    return {
        status: 'success',
        data: images
    }
}

