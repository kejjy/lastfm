import { Box, Button, FormGroup, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Artist } from '../models/artist';
import SearchResults from './search-results';
import { searchArtist } from './search-service';

function SearchLanding() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Artist[]>([]);

  const handleClick = (event: any): void => {
    searchArtist(searchTerm).then((artists: Artist[]) => {
      console.log('mapped', artists);
      setResults(artists);
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value) {
      setSearchTerm(event.target.value);
    }
  };

  return (
    <div>
      <Typography variant="h3" component="h2">
        Lastfm Search
      </Typography>

      <FormGroup>
        <TextField id="search-term" label="Search for Artist" variant="outlined" onChange={handleSearchChange} />

        <Button variant="contained" color="primary" onClick={handleClick}>
          Search
        </Button>
      </FormGroup>

      <SearchResults artists={results} />
    </div>
  );
}

export default SearchLanding;
