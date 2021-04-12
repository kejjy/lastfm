import { Typography } from '@material-ui/core';
import React from 'react';
import ArtistSearchResult from '../artist/artist-search-result';
import { Artist } from '../models/artist';

export interface SearchProps {
  artists: Artist[];
  searchClickedOnce?: boolean;
}

function SearchResults(props: SearchProps) {
  let searchHeader;
  if (!!props.artists.length) {
    searchHeader = <Typography variant="h4">Results ({props.artists.length})</Typography>;
  } else if (props.searchClickedOnce) {
    searchHeader = <Typography variant="h6">No Results</Typography>;
  }

  return (
    <div>
      {searchHeader}
      {props.artists?.map((artist, index) => (
        <ArtistSearchResult key={index} artist={artist} />
      ))}
    </div>
  );
}

export default SearchResults;
