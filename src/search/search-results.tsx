import { Typography } from '@material-ui/core';
import React from 'react';
import ArtistSearchResult from '../artist/artist-search-result';
import { Artist } from '../models/artist';

export interface SearchProps {
  artists: Artist[];
}

function SearchResults(props: SearchProps) {
  return (
    <div>
      {!!props.artists.length && (
        <Typography variant="h4" component="h2">
          Results ({props.artists.length})
        </Typography>
      )}
      {props.artists?.map((artist, index) => (
        <ArtistSearchResult key={index} artist={artist} />
      ))}
    </div>
  );
}

export default SearchResults;
