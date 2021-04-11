import { Accordion, AccordionDetails, AccordionSummary, Chip, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Artist } from '../models/artist';
import { ArtistDetail } from '../models/artist-detail';
import { getArtist } from './artist-service';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import parse from 'html-react-parser';
import ArtistTracks from './artist-tracks';

function ArtistInfo() {
  const location = useLocation();
  const artist = (location.state as any).artist as Artist;

  const [artistDetails, setArtistDetails] = useState<ArtistDetail>();

  useEffect(() => {
    getArtist(artist.mbid).then((artist) => setArtistDetails(artist));
  }, [artist]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h2">
            {artist.name}
            <Chip
              className="tour-badge"
              label={artistDetails?.ontour ? 'On Tour' : 'Not On Tour'}
              color={artistDetails?.ontour ? 'secondary' : 'primary'}
            />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary id="panel1a-header" expandIcon={<ExpandMoreIcon />}>
              <Typography>Biography</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{parse(artistDetails?.bio.content ?? '')}</Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <ArtistTracks artist={artist} />
        </Grid>
      </Grid>
    </div>
  );
}

export default ArtistInfo;
