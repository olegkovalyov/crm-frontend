import React, { FC, ReactElement, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import { Box, LinearProgress, Tab, Typography } from '@material-ui/core';
import { useStyles } from './loads-container.styles';
import { useGetLoadsQuery } from '../../../hooks/graphql/queries/get-loads/get-loads.query.hook';
import Alert from '@material-ui/lab/Alert';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface PropTypes {
  eventId: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const LoadsContainer: FC<PropTypes> = (props): ReactElement => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  let loadTabsJsx: JSX.Element[] | null = null;
  let loadContentJsx: JSX.Element[] | null = null;

  const {
    areLoadsLoading,
    loadsData,
    getLoadsErrorMessage,
    setLoadsErrorMessage,
    wasCalledGetLoads,
    getLoadsAsync,
  } = useGetLoadsQuery();

  useEffect(() => {
    getLoadsAsync(props.eventId);
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

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (loadsData) {
    loadTabsJsx = loadsData.map((load, index) => {
      const key = `tabKey${index}`;
      const label = `Load ${index + 1}`;
      const id = `vertical-tab-${index}`;
      const ariaControls = `vertical-tabpanel-${index}`;
      return <Tab
        key={key}
        label={label}
        id={id}
        aria-controls={ariaControls}
      />;
    });

    loadContentJsx = loadsData.map((load, index) => {
      const key = `tabContentKey${index}`;
      const content = `Here will be content  of Load ${index + 1}`;
      return <TabPanel
        key={key}
        value={value}
        index={index}
      >
        {content}
      </TabPanel>;
    });
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {loadTabsJsx}
      </Tabs>
      {loadContentJsx}
    </div>
  );
};

export default LoadsContainer;
