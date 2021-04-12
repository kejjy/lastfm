import React, { useState } from 'react';
import { Button, FormGroup, TextField, Typography } from '@material-ui/core';
import { Artist } from '../models/artist';
import SearchResults from './search-results';
import { searchArtist } from './search-service';

function SearchLanding() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Artist[]>([]);
  const [searchClickedOnce, setSearchClickedOnce] = useState(false);

  const handleClick = (event: any): void => {
    if (searchTerm.length) {
      searchArtist(searchTerm).then((artists: Artist[]) => {
        setResults(artists);
        setSearchClickedOnce(true);
      });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value) {
      setSearchTerm(event.target.value);
    }
  };

  return (
    <div>
      <Typography variant="h3" component="h2">
        Last.fm Search
      </Typography>

      <FormGroup>
        <TextField id="search-term" label="Search for Artist" variant="outlined" onChange={handleSearchChange} />

        <Button variant="contained" color="primary" onClick={handleClick}>
          Search
        </Button>
      </FormGroup>

      <SearchResults artists={results} searchClickedOnce={searchClickedOnce} />
    </div>
  );
}

export default SearchLanding;
