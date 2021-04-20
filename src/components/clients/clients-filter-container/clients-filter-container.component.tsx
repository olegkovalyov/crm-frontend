import React, { FC, ReactElement } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormGroup,
  FormLabel, Grid,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { RootStateInterface } from '../../../redux/root.reducer';
import {
  isExpandedClientsFilterSelector,
} from '../../../redux/layout/layout.selector';
import {
  collapseClientsFilterAction,
  expandClientsFilterAction,
} from '../../../redux/layout/layout.actions';
import { useStatusFilter } from '../../../hooks/clients/status-filter/status-filter.hook';
import ClientStatusOptions from '../client-status-options/client-status-options.component';
import { useDateFilter } from '../../../hooks/clients/date-filter/date-filter.hook';

interface PropTypesInterface {
  // Search
  onSearchFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  searchFilterValue: string,
}

const ClientsFilterContainer: FC<PropTypesInterface> = (props): ReactElement => {
  const dispatch = useDispatch();
  const isExpanded = useSelector((state: RootStateInterface) => isExpandedClientsFilterSelector(state));

  const handleAccordionChange = (e: React.ChangeEvent<{}>, expanded: boolean): void => {
    expanded ? dispatch(expandClientsFilterAction()) : dispatch(collapseClientsFilterAction());
  };

  const {
    selectedStatusOptions,
    handleStatusOptionsChange,
  } = useStatusFilter();

  const {
    createdDateMin,
    createdDateMax,
    handleCreatedDateMinChange,
    handleCreatedDateMaxChange,
  } = useDateFilter();


  return (
    <Accordion
      expanded={isExpanded}
      onChange={handleAccordionChange}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant='button'>Filter</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid item container spacing={1} xs={12}>
          <Grid item xs={12}>
            <FormLabel component="legend">Client Status:</FormLabel>
            <ClientStatusOptions
              statusOptions={selectedStatusOptions}
              onChange={handleStatusOptionsChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                id="date-picker-dialog"
                format="dd.MM.yyyy"
                label='Select min date'
                value={createdDateMin}
                onChange={handleCreatedDateMinChange}
                inputVariant='outlined'
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                id="date-picker-dialog"
                format="dd.MM.yyyy"
                label='Select max date'
                value={createdDateMax}
                onChange={handleCreatedDateMaxChange}
                inputVariant='outlined'
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
export default ClientsFilterContainer;
