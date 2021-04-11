import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router';
import { Artist } from '../models/artist';

function ArtistInfo() {
  const location = useLocation();
  const artist = (location.state as any).artist as Artist;

  // const handleClick = (event: any): void => {
  //   history.push('/artist');
  // };

  return <div>{artist?.name}</div>;
}

export default ArtistInfo;
