import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResults from './search-results';
import { Artist } from '../models/artist';

describe('Search Results Tests', () => {
  test('when no results and search already clicked, displays No Results message', () => {
    render(<SearchResults artists={[]} searchClickedOnce={true} />);
    expect(screen.getByText(/No Results/i)).toBeInTheDocument();
  });

  test('when no results and search not yet clicked, displays No Results message', () => {
    render(<SearchResults artists={[]} searchClickedOnce={false} />);
    expect(screen.queryByText(/No Results/i)).not.toBeInTheDocument();
  });

  test('when results, displays result count', () => {
    const artists = [{ name: 'First' }, { name: 'Second' }, { name: 'Third' }] as Artist[];
    render(<SearchResults artists={artists} />);

    // TODO: Not sure why, but this renders funky in the test DOM (multi-line), so this is a little hacky to get around that
    expect(screen.getByText(/Results/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });

  test('when results, displays artist name and image', () => {
    const artists = [
      { name: 'First Artist' },
      {
        name: 'Second Artist',
        image: 'https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png',
      },
    ] as Artist[];
    render(<SearchResults artists={artists} />);

    expect(screen.getByText(/First Artist/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/First Artist/i)).not.toBeInTheDocument();
    expect(screen.getByText(/[No Image]]/i)).toBeInTheDocument();

    expect(screen.getByText(/Second Artist/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Second Artist/i)).toBeInTheDocument();
  });
});
