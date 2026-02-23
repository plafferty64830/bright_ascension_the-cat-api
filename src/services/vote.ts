import axios from "axios";
import type { Response } from "../types/Response";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

type Vote = {
    country_code: string;
    id: number;
    image_id: string;
    message: string;
    value: number;
}

type VoteResult = {
    image_id: string;
    vote_count: number;
}

/**
 * 
 * @param id string
 * @returns A promise with the id of the cat that has been set as favourite
 */
export const setVote = async (id: string, value: number): Promise<Response<Vote>> => {

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

    // if the id has not been supplied
    if (id === null ||
        id === undefined ||
        value === null ||
        value === undefined) {
        return {
            status: 'failure',
            error: 'The id for the cat to be set as favourite is missing'
        }
    }

    // use axios and perform the api request
    const { data: response } = await axios.post(
        `${baseUrl}/votes`,
        { 
            image_id: id,
            value 
        },
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
 * get votes for all cats uploaded 
 */
export const getVotes = async (): Promise<Response<VoteResult[]>> => {

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

    // use axios and perform the api request
    const { data: response } = await axios.get(
        `${baseUrl}/votes`,
        {
            params: {
                limit: 100
            },
            headers: {
                "x-api-key": apiKey
            }
        }
    );

    const result: VoteResult[] = [];

    response.forEach((vote: Vote) => {
        const voteIndex = result.findIndex((v) => v.image_id === vote.image_id);
        if(voteIndex === -1){
            result.push({
                image_id: vote.image_id,
                vote_count: vote.value
            })
        } else {
            result[voteIndex].vote_count = result[voteIndex].vote_count + vote.value;
        }
    });

    return {
        status: 'success',
        data: result
    }
}
