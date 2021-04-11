import axios from 'axios';
import * as lastfm from '../lastfm.json';
import { ArtistDetail } from '../models/artist-detail';
import { Track } from '../models/track';

export function getArtist(artistId: string): Promise<ArtistDetail> {
  return axios
    .get(`${lastfm.BASE_URL}/2.0/?method=artist.getinfo&mbid=${artistId}&api_key=${lastfm.API_KEY}&format=json`)
    .then((response: any) => {
      if (response.data.error) {
        return { name: 'Error Ocurred', bio: {} };
      }
      const artist = response.data?.artist;
      return {
        ...artist,
        ontour: artist.ontour === 0,
      };
    });
}

export function getTracks(artistId: string): Promise<Track[]> {
  return axios
    .get(`${lastfm.BASE_URL}/2.0/?method=artist.gettoptracks&mbid=${artistId}&api_key=${lastfm.API_KEY}&format=json`)
    .then((response: any) => {
      if (response.data.error) {
        return [];
      }
      const tracks = response.data?.toptracks.track;
      return tracks.map((track: any) => {
        return {
          ...track,
        };
      });
    });
}
