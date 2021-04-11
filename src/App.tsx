import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';
import './App.css';
import SearchLanding from './search/search-landing';
import ArtistInfo from './artist/artist-info';

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
        <BrowserRouter>
          <Switch>
            <Route path="/Artist">
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
