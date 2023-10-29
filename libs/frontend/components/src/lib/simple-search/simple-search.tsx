import { Button, OutlinedInput } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './simple-search.module.scss';

/* eslint-disable-next-line */
export interface SimpleSearchProps {}

export function SimpleSearch() {
  const [keyword, setKeyword] = React.useState<string>('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  React.useEffect(() => {
    const searchKeyword = queryParams.get('keyword');
    if (searchKeyword) {
      setKeyword(searchKeyword);
    }
  }, []);

  const handleSearch = () => {
    navigate({
      search: createSearchParams({
        ...Object.fromEntries(queryParams.entries()),
        keyword: keyword,
      }).toString(),
    });
  };
  return (
    <div className={`${styles['search']} row g-3`}>
      <div className="col-12 col-md-8 col-lg-7">
        <OutlinedInput
          size="small"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={styles['search__input']}
        />
      </div>
      <div className="col-12 col-md-4">
        <Button
          variant="contained"
          disableElevation
          sx={{
            padding: '8px 16px',
          }}
          onClick={handleSearch}
          className={styles['search__btn']}
        >
          {t('common.search')}
        </Button>
      </div>
    </div>
  );
}

export default SimpleSearch;
