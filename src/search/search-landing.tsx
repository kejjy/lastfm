import { Box, Button, FormGroup, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { searchArtist } from './search-service';

function SearchLanding() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleClick = (event: any): void => {
    searchArtist(searchTerm).then((data) => console.log(data));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Box>
        <form noValidate autoComplete="off">
          <FormGroup>
            <TextField id="search-term" label="Search for Artist" variant="outlined" onChange={handleSearchChange} />

            <Button variant="contained" color="primary" onClick={handleClick}>
              Search
            </Button>
          </FormGroup>
        </form>
      </Box>
      <Box>Search Results List</Box>
    </div>
  );
}

export default SearchLanding;
