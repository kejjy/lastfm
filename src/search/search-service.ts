import axios from 'axios';
import { Artist } from '../models/artist';

const API_KEY = '1c40f72613733431b6e47a72e9950a9b';
const BASE_URL = 'http://ws.audioscrobbler.com';

const IMAGE_INDEX_SM = 1;
const IMAGE_INDEX_XL = 4;

export function searchArtist(searchTerm: string): Promise<Artist[]> {
  return axios
    .get(`${BASE_URL}/2.0/?method=artist.search&artist=${searchTerm}&api_key=${API_KEY}&format=json`)
    .then((response: any) => {
      const artists = response.data?.results?.artistmatches.artist;
      return artists.map((artist: any) => {
        return {
          ...artist,
          image: getLastFmImage(artist, IMAGE_INDEX_SM),
          imageLarge: getLastFmImage(artist, IMAGE_INDEX_XL),
        };
      });
    });
}

function getLastFmImage(artist: any, size: number): string {
  return artist.image?.[size]['#text'];
}
