import React, { useEffect, useState } from 'react';
import { FormGroup, TablePagination, TextField, Typography } from '@material-ui/core';
import { Artist } from '../models/artist';
import SearchResults from './search-results';
import { searchArtist } from './search-service';
import { SearchResponse } from '../models/search-results';
import { Pagination } from '../models/pagination';
import { useDebounce } from '../hooks/useDebounce';

const ITEMS_PER_PAGE = 30;

function SearchLanding() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    currentPage: 0,
    itemsPerPage: ITEMS_PER_PAGE,
  });
  const [results, setResults] = useState<Artist[]>([]);
  const [searchClickedOnce, setSearchClickedOnce] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event: any, page: any): void => {
    setPagination({ ...pagination, currentPage: page });
  };

  useEffect(() => {
    if (pagination.currentPage === 0) {
      search(pagination.currentPage);
    } else {
      setPagination({ ...pagination, currentPage: 0 });
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    search(pagination.currentPage);
  }, [pagination.currentPage]);

  const search = (page: number): void => {
    if (debouncedSearchTerm?.length) {
      searchArtist(debouncedSearchTerm, page + 1).then((result: SearchResponse) => {
        setPagination({ ...pagination, total: result.totalResults });
        setResults(result.artists);
        setSearchClickedOnce(true);
      });
    } else {
      setResults([]);
      setPagination({ ...pagination, currentPage: 0 });
    }
  };

  return (
    <div>
      <Typography variant="h3" component="h2">
        Last.fm Search
      </Typography>

      <FormGroup>
        <TextField id="search-term" label="Search for Artist" variant="outlined" onChange={handleSearchTermChange} />
      </FormGroup>

      {!!results?.length && (
        <TablePagination
          component="div"
          count={pagination.total}
          page={pagination.currentPage}
          onChangePage={handleChangePage}
          rowsPerPage={ITEMS_PER_PAGE}
          rowsPerPageOptions={[30]}
        />
      )}
      <SearchResults artists={results} searchClickedOnce={searchClickedOnce} />
    </div>
  );
}

export default SearchLanding;
