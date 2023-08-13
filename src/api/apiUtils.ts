import axios from 'axios';
import { Album, Track } from './lastfmTypes';

/* axios.interceptors.request.use((config) => {
  console.log('Axios Request:', config);
  return config;
});

axios.interceptors.response.use((response) => {
  console.log('Axios Response:', response);
  return response;
}); */

export async function getAlbum(artist: string, album: string, username: string): Promise<Album | Error> {
  try {
    const url = process.env.REACT_APP_SERVER_URL as string + "lastfm/album?artist=" + artist + "&album=" + album + "&username=" + username;
    const response = await axios.get(url);
    
    return response.data as Album;
  } catch (error) {
    return error as Error;
  }
}

export async function getTrack(artist: string, track: string, username: string): Promise<Track | Error> {
  try {
    const url = process.env.REACT_APP_SERVER_URL as string + "lastfm/track?artist=" + artist + "&track=" + track + "&username=" + username;
    const response = await axios.get(url);

    return response.data as Track;
  } catch (error) {
    return error as Error;
  }
}