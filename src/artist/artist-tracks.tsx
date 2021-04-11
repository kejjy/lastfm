import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Artist } from '../models/artist';
import { getTracks } from './artist-service';
import { Track } from '../models/track';

export interface ArtistTrackProps {
  artist: Artist;
}

function ArtistTracks(props: ArtistTrackProps) {
  const [artistTracks, setArtistTracks] = useState<Track[]>([]);

  useEffect(() => {
    getTracks(props.artist.mbid).then((tracks) => setArtistTracks(tracks));
  }, [props.artist]);

  return (
    <div>
      <Typography variant="h5">Top Tracks</Typography>
      {artistTracks.map((track, index) => {
        return (
          <div key={index}>
            <Typography className="track">
              {track.name} <span className="plays">({`${track.playcount} Plays`})</span>
            </Typography>
          </div>
        );
      })}
    </div>
  );
}

export default ArtistTracks;
