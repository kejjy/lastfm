import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { Artist } from '../models/artist';

export interface SearchProps {
  artists: Artist[];
}

function SearchResults(props: SearchProps) {
  const history = useHistory();

  const handleClick = (artist: Artist) => (event: any): void => {
    history.push({
      pathname: '/Artist',
      state: { artist },
    });
  };

  function displayArtistResult(artist: Artist, index: number): JSX.Element {
    let artistImage;
    if (artist.image) {
      artistImage = <img src={artist.image} alt={`${artist.name}`} />;
    } else {
      artistImage = <div>[No Image]</div>;
    }

    return (
      <div key={index}>
        <Grid container spacing={3}>
          <Grid item xs={1}>
            {artistImage}
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h6" component="h2" className="artist-result" onClick={handleClick(artist)}>
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
          Results ({props.artists.length})
        </Typography>
      )}
      {props.artists?.map((artist, index) => displayArtistResult(artist, index))}
    </div>
  );
}

export default SearchResults;
