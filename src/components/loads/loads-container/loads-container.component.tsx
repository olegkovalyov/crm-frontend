import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Button, Grid, Tab, Tabs } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './loads-container.styles';
import LoadsTabs from '../loads-tabs/loads-tabs.component';
import LoadsPanels from '../loads-panels/loads-panels.component';
import TabPanel from '../../common/tab-panel/tab-panel.component';
import ClientsPanel from '../clients-panel/clients-panel.component';
import { useLoads } from '../../../hooks/ui/loads/loads.hook';
import ErrorModal from '../../common/error-modal/error-modal.component';
import { useErrorModal } from '../../../hooks/ui/error-modal/error-modal.hook';
import { EVENTS_URL } from '../../../constants/route.constants';
import { useGetLoadsQuery } from '../../../hooks/graphql/queries/get-loads/get-loads.query.hook';

interface PropTypes {
  eventId: string;
}

const LoadsContainer: FC<PropTypes> = (props): ReactElement => {

  const classes = useStyles();
  const eventId = parseInt(props.eventId);

  const {
    getLoadsAsync,
  } = useGetLoadsQuery();

  return (<></>);

  // let errorMessage: string | null = null;
  // const history = useHistory();
  //
  // const [retryCount, setRetryCount] = useState(0);
  // const [errorModalBtnName, setErrorModalBtnName] = useState('Retry');
  //
  // const {
  //   // Load tabs
  //   selectedLoadTab,
  //   handleChangeLoadTab,
  //   // Create load
  //   createLoad,
  //   getLoadsAsync,
  //   inProcessOfFetchingLoads,
  //   loads,
  //   // Delete load
  //   deleteLoad,
  //   // Slot tabs
  //   selectedUnassignedUsersTab,
  //   handleChangeUnassignedUsersTab,
  //   // Create slot
  //   createSlot,
  //   // Delete slot
  //   deleteSlot,
  //   // Additional info
  //   mutationErrorMessage,
  //   queryErrorMessage,
  //   currentLoadId,
  //   loading,
  //   clients,
  //   members,
  // } = useLoads(eventId);
  //
  // const {
  //   isOpenErrorModal,
  //   handleOpenErrorModal,
  //   handleCloseErrorModal,
  // } = useErrorModal();
  //
  // useEffect(() => {
  //   if (queryErrorMessage) {
  //     setRetryCount(prevCount => {
  //       const newCount = prevCount + 1;
  //       if (newCount > 3) {
  //         setErrorModalBtnName('Ok');
  //       }
  //       return newCount;
  //     });
  //     console.log(retryCount);
  //     errorMessage = queryErrorMessage;
  //   } else if (mutationErrorMessage) {
  //     errorMessage = mutationErrorMessage;
  //   }
  //   handleOpenErrorModal();
  // }, [queryErrorMessage, mutationErrorMessage]);
  // // useErrorNotify(mutationErrorMessage, 'Ok');
  //
  // return (
  //   <>
  //     <Grid container>
  //       <Grid item xs={12} sm={12}>
  //         <div className={classes.loadTabs}>
  //           <Button
  //             variant="contained"
  //             color="primary"
  //             size="large"
  //             className={classes.button}
  //             startIcon={<AddIcon />}
  //             onClick={async (e) => {
  //               await createLoad();
  //             }}
  //           >
  //             Add Load
  //           </Button>
  //           <AppBar position="static" color="default">
  //             <LoadsTabs
  //               loads={loads}
  //               selectedLoadTab={selectedLoadTab}
  //               handleChangeLoadTab={handleChangeLoadTab}
  //             />
  //           </AppBar>
  //           <LoadsPanels
  //             loads={loads}
  //             selectedLoadTab={selectedLoadTab}
  //             handleDeleteLoad={deleteLoad}
  //             isLoading={loading}
  //             handleDeleteSlot={deleteSlot}
  //           />
  //         </div>
  //       </Grid>
  //       <Grid item xs={12} sm={12} className={classes.unassignedContainer}>
  //         <div className={classes.slotTabs}>
  //           <AppBar position="static" color='default'>
  //             <Tabs
  //               value={selectedUnassignedUsersTab}
  //               onChange={handleChangeUnassignedUsersTab}
  //               aria-label="simple tabs example"
  //             >
  //               <Tab label="Clients" />
  //               <Tab label="Staff" />
  //               <Tab label="Members" />
  //             </Tabs>
  //           </AppBar>
  //           <TabPanel value={selectedUnassignedUsersTab} index={0}>
  //             <ClientsPanel
  //               clients={clients}
  //               handleCreateSlot={createSlot}
  //               currentLoadId={currentLoadId}
  //               isLoading={loading}
  //             />
  //           </TabPanel>
  //           <TabPanel value={selectedUnassignedUsersTab} index={1}>
  //             Staff
  //           </TabPanel>
  //           <TabPanel value={selectedUnassignedUsersTab} index={2}>
  //             Members
  //           </TabPanel>
  //         </div>
  //       </Grid>
  //     </Grid>
  //   </>
  // );
};

export default LoadsContainer;
