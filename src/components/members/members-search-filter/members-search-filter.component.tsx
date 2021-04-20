import React, { FC, ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';
import { useStyles } from './members-search-filter.styles';

interface PropTypesInterface {
  searchFilterValue: string;
  onSearchFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MemberSearchFilter: FC<PropTypesInterface> = (props): ReactElement => {
  const { onSearchFilterChange, searchFilterValue } = props;

  const classes = useStyles();

  return (
    <>
      <TextField
        value={searchFilterValue}
        onChange={onSearchFilterChange}
        required
        id="searchFilter"
        name="searchFilter"
        fullWidth
        variant='outlined'
      />
    </>
  );
};

export default MemberSearchFilter;
