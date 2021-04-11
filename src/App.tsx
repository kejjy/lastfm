import { Container } from '@material-ui/core';
import React from 'react';
import './App.css';
import SearchLanding from './search/search-landing';

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
        <SearchLanding />
      </Container>
    </div>
  );
}

export default App;
