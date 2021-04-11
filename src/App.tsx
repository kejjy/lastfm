import React from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { Breadcrumbs, Container, Typography } from '@material-ui/core';
import './App.css';
import SearchLanding from './search/search-landing';
import ArtistInfo from './artist/artist-info';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const history = useHistory();

  return (
    <div className="App">
      <Container maxWidth="md">
        <BrowserRouter>
          <Switch>
            <Route path="/Artist">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/" to="/">
                  Search Home
                </Link>
                <Typography color="textPrimary">Artist Information</Typography>
              </Breadcrumbs>
              <ArtistInfo />
            </Route>

            <Route path="/">
              <SearchLanding />
            </Route>
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
