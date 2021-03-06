import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SearchLanding from './search-landing';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

jest.mock('axios');

describe('Search Landing Tests', () => {
  test('displays header and search box', () => {
    render(<SearchLanding />);
    expect(screen.getByText(/Last.fm Search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start typing to search for an artist/i)).toBeInTheDocument();
    expect(screen.queryByText(/No Results/i)).not.toBeInTheDocument();
  });

  test('when search text, clicking search button calls search service', async () => {
    const response = {
      data: {
        results: {
          artistmatches: {
            artist: [{ name: 'Test Artist' }],
          },
        },
      },
    };

    const getSpy = jest.spyOn(axios, 'get');
    getSpy.mockResolvedValue(response);

    render(<SearchLanding />);
    const textbox = screen.getByLabelText(/Start typing to search for an artist/i);
    userEvent.type(textbox, 'Cher');

    expect(textbox).toHaveValue('Cher');

    // TO WHOM IT MAY CONCERN... I spent way too much time trying to find the right combination of mock/wait code, OOF
    // Struggled with this a bit on my last React project and would love to know if this looks good / is there a better way
    await waitFor(() => {
      expect(getSpy).toHaveBeenCalled();
      expect(screen.queryByText(/Test Artist/i)).toBeInTheDocument();
    });
  });

  test('when no results, displays no results message', async () => {
    const response = {
      data: {
        results: {
          artistmatches: {
            artist: [],
          },
        },
      },
    };

    const getSpy = jest.spyOn(axios, 'get');
    getSpy.mockResolvedValue(response);

    render(<SearchLanding />);
    const textbox = screen.getByLabelText(/Start typing to search for an artist/i);
    userEvent.type(textbox, 'Cher');

    expect(textbox).toHaveValue('Cher');

    await waitFor(() => {
      expect(getSpy).toHaveBeenCalled();
      expect(screen.getByText(/No Results/i)).toBeInTheDocument();
    });
  });
});
