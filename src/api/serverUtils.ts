import config from "../config";
import axios from "axios";
import { Album, Track } from "./lastfmTypes";

type Post = {
    title: string;
    body: string;
    userid: string;
    lastfmattachment: Album | Track | null;
};

/* axios.interceptors.request.use((config) => {
    console.log('Axios Request:', config);
    return config;
});
  
axios.interceptors.response.use((response) => {
    console.log('Axios Response:', response);
    return response;
}); */

export async function postPost(data: Post): Promise<string | Error> {
    try {
        const url = config.API_URL + "posts";
        const response = await axios.post(url, data);
        
        return response.data as string;
    } catch (error) {
        return error as Error;
    }
}