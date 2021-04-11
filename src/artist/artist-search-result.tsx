import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { Artist } from '../models/artist';

export interface ArtistSearchResultProps {
  artist: Artist;
}

function ArtistSearchResult(props: ArtistSearchResultProps) {
  const history = useHistory();

  const handleClick = (event: any): void => {
    history.push({
      pathname: '/Artist',
      state: { artist: props.artist },
    });
  };

  let artistImage;
  if (props.artist.image) {
    artistImage = <img src={props.artist.image} alt={`${props.artist.name}`} />;
  } else {
    artistImage = <div>[No Image]</div>;
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          {artistImage}
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h6" className="artist-result" onClick={handleClick}>
            {props.artist.name}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default ArtistSearchResult;
