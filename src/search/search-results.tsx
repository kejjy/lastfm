import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Artist } from '../models/artist';

export interface SearchProps {
  artists: Artist[];
}

function SearchResults(props: SearchProps) {
  const handleClick = (event: any): void => {};

  function displayArtistResult(artist: Artist, index: number): JSX.Element {
    return (
      <div key={index}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            {<img src={artist.image} alt={`${artist.name}`} />}
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h6" component="h2">
              {artist.name}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div>
      {!!props.artists.length && (
        <Typography variant="h4" component="h2">
          Results
        </Typography>
      )}
      {props.artists?.map((artist, index) => displayArtistResult(artist, index))}
    </div>
  );
}

export default SearchResults;
