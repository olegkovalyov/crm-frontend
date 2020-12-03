import React, { FC, ReactElement, useEffect, useState } from 'react';
import { AppBar, Button, Grid, Tab, Tabs } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './loads-container.styles';
import { useGetLoadsQuery } from '../../../hooks/graphql/queries/get-loads/get-loads.query.hook';
import LoadsTabs from '../loads-tabs/loads-tabs.component';
import LoadsPanels from '../loads-panels/loads-panels.component';
import { useCreateLoadMutation } from '../../../hooks/graphql/mutations/create-load/create-load.mutation.hook';
import { LoadStatus, UserRole } from '../../../interfaces/generated/globalTypes';
import { useDeleteLoadMutation } from '../../../hooks/graphql/mutations/delete-load/delete-load.mutation.hook';
import TabPanel from '../../common/tab-panel/tab-panel.component';
import ClientsPanel from '../clients-panel/clients-panel.component';
import { useCreateSlotMutation } from '../../../hooks/graphql/mutations/create-slot/create-slot.mutation.hook';
import { useDeleteSlotMutation } from '../../../hooks/graphql/mutations/delete-slot/delete-slot.mutation.hook';

interface PropTypes {
  eventId: string;
}

const LoadsContainer: FC<PropTypes> = (props): ReactElement => {
  let errorMessage = '';
  let errorJsx: JSX.Element | null = null;
  const classes = useStyles();
  const [selectedLoadTab, setSelectedLoadTab] = useState(0);
  const [selectedSlotTab, setSelectedSlotTab] = React.useState(0);

  const handleChangeLoadTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedLoadTab(newValue);
  };

  const handleSelectedSlotTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedSlotTab(newValue);
  };

  const eventId = parseInt(props.eventId);

  const {
    areLoadsLoading,
    loads,
    clients,
    members,
    getLoadsErrorMessage,
    setLoadsErrorMessage,
    wasCalledGetLoads,
    getLoadsAsync,
  } = useGetLoadsQuery();

  const {
    createLoadAsync,
    createLoadErrorMessage,
    inProcessOfCreatingLoad,
  } = useCreateLoadMutation();

  const {
    createSlotAsync,
    createSlotErrorMessage,
    inProcessOfCreatingSlot,
    wasCalledCreateSlot,
    slot,
  } = useCreateSlotMutation();

  const {
    deleteSlotAsync,
    deleteSlotErrorMessage,
    deleteSlotData,
    wasCalledDeleteSlot,
    inProcessOfDeletingSlot,
  } = useDeleteSlotMutation();


  const {
    deleteLoadAsync,
    deleteLoadErrorMessage,
    inProcessOfDeletingLoad,
  } = useDeleteLoadMutation();


  useEffect(() => {
    getLoadsAsync(
      eventId,
      null,
      null,
      null,
      null,
      false,
      null,
      null,
    );// eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (wasCalledGetLoads
      && !areLoadsLoading
    ) {
      if (!loads) {
        setLoadsErrorMessage('Failed to load');
      }
    }// eslint-disable-next-line
  }, [
    wasCalledGetLoads,
    areLoadsLoading,
  ]);

  useEffect(() => {
    if (wasCalledCreateSlot
      && !inProcessOfCreatingSlot
    ) {
      if (!slot) {
        setLoadsErrorMessage('Failed to create slot');
      }
    }// eslint-disable-next-line
  }, [
    wasCalledCreateSlot,
    inProcessOfCreatingSlot,
  ]);

  useEffect(() => {
    if (wasCalledDeleteSlot
      && !inProcessOfDeletingSlot
    ) {
      if (!slot) {
        setLoadsErrorMessage('Failed to delete slot');
      }
    }// eslint-disable-next-line
  }, [
    wasCalledDeleteSlot,
    inProcessOfDeletingSlot,
  ]);


  const isLoading = areLoadsLoading
    || inProcessOfCreatingSlot
    || inProcessOfCreatingLoad
    || inProcessOfDeletingLoad
    || inProcessOfDeletingSlot;

  if (getLoadsErrorMessage) {
    errorMessage = getLoadsErrorMessage;
  }

  if (createLoadErrorMessage) {
    errorMessage = createLoadErrorMessage;
  }

  if (deleteLoadErrorMessage) {
    errorMessage = deleteLoadErrorMessage;
  }

  if (errorMessage) {
    errorJsx = <>
      <Alert severity="error">{errorMessage}</Alert>
    </>;
  }

  let currentLoadId = null;
  if (loads
    && loads.length
  ) {
    currentLoadId = loads[selectedLoadTab].id;
    console.log(currentLoadId);
  }

  const handleCreateSlot = async (
    loadId: number,
    userId: number,
    firstName: string,
    lastName: string,
    role: UserRole,
    description: string,
  ) => {
    await createSlotAsync(
      loadId,
      userId,
      firstName,
      lastName,
      role,
      description,
    );
    await getLoadsAsync(
      eventId,
      null,
      null,
      null,
      null,
      false,
      null,
      null,
    );
  };

  const handleDeleteSlot = async (slotId: number) => {
    await deleteSlotAsync(slotId);
    await getLoadsAsync(
      eventId,
      null,
      null,
      null,
      null,
      false,
      null,
      null,
    );
  };

  const handleDeleteLoad = async (loadId: number) => {
    await deleteLoadAsync(loadId);
    await getLoadsAsync(
      eventId,
      null,
      null,
      null,
      null,
      false,
      null,
      null,
    );
    const newTabPosition = (selectedLoadTab === 0) ? 0 : selectedLoadTab - 1;
    setSelectedLoadTab(newTabPosition);
  };

  const handleAddLoad = async (event: React.MouseEvent) => {
    if (loads) {
      const highestOrder = loads.length;
      await createLoadAsync(
        eventId,
        LoadStatus.DRAFT,
        new Date(),
        '',
        '',
        highestOrder,
      );
      await getLoadsAsync(
        eventId,
        null,
        null,
        null,
        null,
        false,
        null,
        null,
      );
      setSelectedLoadTab(highestOrder);
    }
  };


  return (
    <>
      {errorJsx}
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleAddLoad}
      >
        Add
      </Button>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <div className={classes.loadTabs}>
            <AppBar position="static" color="default">
              <LoadsTabs
                loads={loads}
                selectedLoadTab={selectedLoadTab}
                handleChangeLoadTab={handleChangeLoadTab}
              />
            </AppBar>
            <LoadsPanels
              loads={loads}
              selectedLoadTab={selectedLoadTab}
              handleDeleteLoad={handleDeleteLoad}
              isLoading={isLoading}
              handleDeleteSlot={handleDeleteSlot}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div className={classes.slotTabs}>
            <AppBar position="static">
              <Tabs value={selectedSlotTab} onChange={handleSelectedSlotTab} aria-label="simple tabs example">
                <Tab label="Staff" />
                <Tab label="Members" />
                <Tab label="Clients" />
              </Tabs>
            </AppBar>
            <TabPanel value={selectedSlotTab} index={0}>
              Staff
            </TabPanel>
            <TabPanel value={selectedSlotTab} index={1}>
              Members
            </TabPanel>
            <TabPanel value={selectedSlotTab} index={2}>
              <ClientsPanel
                clients={clients}
                handleCreateSlot={handleCreateSlot}
                currentLoadId={currentLoadId}
                isLoading={isLoading}
              />
            </TabPanel>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default LoadsContainer;
