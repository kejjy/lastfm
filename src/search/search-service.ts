import axios from 'axios';
import { Artist } from '../models/artist';
import * as lastfm from '../lastfm.json';
import { SearchResponse } from '../models/search-results';

const IMAGE_INDEX_SM = 1;
const IMAGE_INDEX_XL = 4;

export function searchArtist(searchTerm: string, page: number): Promise<SearchResponse> {
  return axios
    .get(
      `${lastfm.BASE_URL}/2.0/?method=artist.search&artist=${searchTerm}&page=${page}&api_key=${lastfm.API_KEY}&format=json`,
    )
    .then((response: any) => {
      const data = response.data?.results;
      const artists = data?.artistmatches.artist;

      return {
        artists: artists?.map((artist: any) => mapToArtist(artist)),
        totalResults: parseInt(data['opensearch:totalResults']),
        itemsPerPage: parseInt(data['opensearch:itemsPerPage']),
        startIndex: parseInt(data['opensearch:startIndex']),
      };
    });
}

function mapToArtist(artist: any): Artist {
  return {
    ...artist,
    image: getLastFmImage(artist, IMAGE_INDEX_SM),
    imageLarge: getLastFmImage(artist, IMAGE_INDEX_XL),
  };
}

function getLastFmImage(artist: any, size: number): string {
  return artist.image?.[size]?.['#text'];
}
