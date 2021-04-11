import axios from 'axios';
import { Artist } from '../models/artist';

const API_KEY = '1c40f72613733431b6e47a72e9950a9b';
const BASE_URL = 'http://ws.audioscrobbler.com';

export function searchArtist(searchTerm: string): Promise<Artist[]> {
  return axios
    .get(`${BASE_URL}/2.0/?method=artist.search&artist=${searchTerm}&api_key=${API_KEY}&format=json`)
    .then((response: any) => {
      return response.data?.results?.artistmatches;
    });
}