import React, { FC, ReactElement, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useStyles } from './loads-container.styles';
import { useGetLoadsQuery } from '../../../hooks/graphql/queries/get-loads/get-loads.query.hook';
import LoadsTabs from '../loads-tabs/loads-tabs.component';
import LoadsPanels from '../loads-panels/loads-panels.component';


interface PropTypes {
  eventId: string;
}


const LoadsContainer: FC<PropTypes> = (props): ReactElement => {
  const classes = useStyles();
  const [selectedLoadTab, setSelectedLoadTab] = React.useState(1);

  const eventId = parseInt(props.eventId);

  const {
    areLoadsLoading,
    loadsData,
    getLoadsErrorMessage,
    setLoadsErrorMessage,
    wasCalledGetLoads,
    getLoadsAsync,
  } = useGetLoadsQuery();

  useEffect(() => {
    getLoadsAsync(eventId);
  }, []);

  useEffect(() => {
    if (wasCalledGetLoads
      && !areLoadsLoading) {
      if (!loadsData) {
        setLoadsErrorMessage('Failed to load event');
      }
    }
  }, [wasCalledGetLoads, areLoadsLoading]);

  if (areLoadsLoading) {
    return (
      <>
        <LinearProgress />
      </>
    );
  }

  if (getLoadsErrorMessage) {
    return (
      <>
        <Alert severity="error">{getLoadsErrorMessage}</Alert>
      </>
    );
  }

  const handleChangeLoadTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedLoadTab(newValue);
  };


  return (
    <div className={classes.root}>
      <LoadsTabs
        loads={loadsData}
        selectedLoadTab={selectedLoadTab}
        handleChangeLoadTab={handleChangeLoadTab}
        className={classes.tabs}
      />
      <LoadsPanels
        loads={loadsData}
        selectedLoadTab={selectedLoadTab}
      />
    </div>
  );
};

export default LoadsContainer;
