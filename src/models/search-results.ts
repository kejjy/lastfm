import { Artist } from './artist';

export interface SearchResponse {
  artists: Artist[];
  itemsPerPage: number;
  totalResults: number;
  startIndex: number;
}
