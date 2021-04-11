import { Artist } from './artist';

export interface ArtistDetail extends Artist {
  ontour: boolean;
  bio: AristBio;
}

export interface AristBio {
  content: string;
  published: Date;
  summary: string;
}
