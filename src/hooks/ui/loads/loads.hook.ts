import React, { useEffect, useState } from 'react';
import { LoadStatus, UserRole } from '../../../interfaces/generated/globalTypes';
import { useGetLoadsQuery } from '../../graphql/queries/get-loads/get-loads.query.hook';
import { useCreateLoadMutation } from '../../graphql/mutations/create-load/create-load.mutation.hook';
import { useDeleteLoadMutation } from '../../graphql/mutations/delete-load/delete-load.mutation.hook';
import { useCreateSlotMutation } from '../../graphql/mutations/create-slot/create-slot.mutation.hook';
import { useDeleteSlotMutation } from '../../graphql/mutations/delete-slot/delete-slot.mutation.hook';

export const useLoads = (eventId: number) => {
  const [loading, setLoading] = useState(false);
  const [selectedLoadTab, setSelectedLoadTab] = useState(0);
  const [selectedUnassignedUsersTab, setSelectedUnassignedUsersTab] = useState(0);
  const [currentLoadId, setCurrentLoadId] = useState(0);

  const handleChangeLoadTab = (event: React.ChangeEvent<{}>, tabindex: number) => {
    setSelectedLoadTab(tabindex);
  };

  const handleChangeUnassignedUsersTab = (event: React.ChangeEvent<{}>, tabIndex: number) => {
    setSelectedUnassignedUsersTab(tabIndex);
  };

  const {
    inProcessOfFetchingLoads,
    loads,
    clients,
    members,
    getLoadsErrorMessage,
    getLoadsAsync,
  } = useGetLoadsQuery();

  const {
    createLoadAsync,
    createLoadErrorMessage,
    inProcessOfCreatingLoad,
  } = useCreateLoadMutation();

  const {
    deleteLoadAsync,
    deleteLoadErrorMessage,
    inProcessOfDeletingLoad,
  } = useDeleteLoadMutation();

  const {
    createSlotAsync,
    createSlotErrorMessage,
    inProcessOfCreatingSlot,
  } = useCreateSlotMutation();

  const {
    deleteSlotAsync,
    deleteSlotErrorMessage,
    inProcessOfDeletingSlot,
  } = useDeleteSlotMutation();

  const mutationErrorMessage = [
    createLoadErrorMessage,
    deleteLoadErrorMessage,
    createSlotErrorMessage,
    deleteSlotErrorMessage,
  ].find(message => message !== null) ?? null;

  // Initial data loading
  useEffect(() => {
    (async function wrapper() {
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
    })();
  }, []);

  useEffect(() => {
    if (loads
      && loads.length
    ) {
      setCurrentLoadId(loads[selectedLoadTab].id);
    }
  }, []);

  useEffect(() => {
    if (inProcessOfCreatingLoad
      || inProcessOfDeletingLoad
      || inProcessOfFetchingLoads
      || inProcessOfCreatingSlot
      || inProcessOfDeletingSlot
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    inProcessOfFetchingLoads,
    inProcessOfCreatingLoad,
    inProcessOfDeletingLoad,
    inProcessOfCreatingSlot,
    inProcessOfDeletingSlot,
  ]);


  const createLoad = async () => {
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

  const deleteLoad = async (loadId: number) => {
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

  const createSlot = async (
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

  const deleteSlot = async (slotId: number) => {
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

  return {
    // Load tabs
    selectedLoadTab,
    handleChangeLoadTab,
    // Create load
    createLoad,
    inProcessOfFetchingLoads,
    loads,
    // Delete load
    deleteLoad,
    // Slot tabs
    selectedUnassignedUsersTab,
    handleChangeUnassignedUsersTab,
    // Create slot
    createSlot,
    // Delete slot
    deleteSlot,
    // Additional info
    mutationErrorMessage,
    queryErrorMessage: getLoadsErrorMessage,
    currentLoadId,
    loading,
    clients,
    members,
    getLoadsAsync,
  };

};
