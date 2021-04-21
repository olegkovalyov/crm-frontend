import React, { useEffect, useState } from 'react';
import { GridRowsProp } from '@material-ui/x-grid';
import { useSelector } from 'react-redux';
import { RootStateInterface } from '../../../redux/root.reducer';
import {
  getClients,
  getClientStatusOptionsForFilter, getCreatedAtMaxForFilter, getCreatedAtMinForFilter,
} from '../../../redux/clients/clients.selector';
import { ClientInterface } from '../../../interfaces/client.interface';

export const useClientsFilter = () => {

  const clients = useSelector((state: RootStateInterface) => getClients(state));
  const selectedStatusOptions = useSelector((state: RootStateInterface) => getClientStatusOptionsForFilter(state));
  const createdMin = useSelector((state: RootStateInterface) => getCreatedAtMinForFilter(state));
  const createdMax = useSelector((state: RootStateInterface) => getCreatedAtMaxForFilter(state));


  const [tableData, setTableData] = useState<GridRowsProp>(clients);
  const [searchFilterValue, setSearchFilterValue] = useState('');

  useEffect(() => {
    const filteredData = applyFilter(clients);
    const rows = filteredData.map((client) => ({
      id: client.id,
      role: client.role,
      status: client.status,
      lastName: client.lastName,
      firstName: client.firstName,
      certificate: client.certificate,
      email: client.email,
      gender: client.gender,
      age: client.age,
      weight: client.weight,
      phone: client.phone,
      withCameraman: client.withCameraman,
      withHandCameraVideo: client.withHandCameraVideo,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      processedAt: client.processedAt,
      actions: client.id,
    }));
    setTableData(rows);
  }, [
    selectedStatusOptions,
    searchFilterValue,
    clients,
    createdMin,
    createdMax,
  ]);

  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilterValue(e.target.value);
  };

  const applyFilter = (data: ClientInterface[]): ClientInterface[] => data.filter(client => {
    if (selectedStatusOptions.length) {
      let shouldPass = false;
      selectedStatusOptions.forEach(status => {
        if (client.status === status) {
          shouldPass = true;
        }
      });
      return shouldPass;
    }
    return true;
  }).filter(client => {
    const value = searchFilterValue.trim();
    if (value !== '') {
      let shouldPass = false;
      if (client.firstName.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        || client.lastName.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        || client.email.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        || client.certificate.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      ) {
        shouldPass = true;
      }
      return shouldPass;
    }
    return true;
  }).filter(client => {
    const date = new Date(client.createdAt).getTime();
    return date >= new Date(createdMin).getTime()
      && date <= new Date(createdMax).getTime();
  });

  return {
    selectedStatusOptions,
    applyFilter,
    searchFilterValue,
    handleSearchFilterChange,
    tableData,
  };
};


