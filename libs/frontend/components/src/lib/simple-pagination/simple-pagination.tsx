import { Pagination } from '@mui/material';
import { PaginationProps } from '../types';
import React from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface SimplePaginationProps {}

export function SimplePagination({ pagination }: PaginationProps) {
  const [page, setPage] = React.useState(pagination.currentPage);

  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    navigate({
      search: createSearchParams({
        ...Object.fromEntries(queryParams.entries()),
        page: value.toString(),
      }).toString(),
    });
  };
  return (
    <Pagination
      count={pagination.totalPages}
      page={page}
      variant="outlined"
      shape="rounded"
      onChange={handleChange}
    />
  );
}

export default SimplePagination;
