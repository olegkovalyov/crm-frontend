import { ClientInterface } from '../../../interfaces/client.interface';
import { ClientStatus, ClientRole, Gender } from '../../../interfaces/generated/globalTypes';

export const useClientsTableRender = () => {

  const renderClientRole = (client: ClientInterface) => {
    let output = '';
    if (client.role === ClientRole.TANDEM) {
      output = 'TM';
    } else if (client.role === ClientRole.AS_A_PASSENGER) {
      output = 'Passenger';
    } else if (client.role === ClientRole.STATIC_LINE) {
      output = 'Static line';
    }
    return output;
  };

  const renderGender = (client: ClientInterface) => {
    let output = '';
    if (client.gender === Gender.MALE) {
      output = 'M';
    } else {
      output = 'F';
    }
    return output;
  };

  const renderClientStatus = (client: ClientInterface) => {
    let output = '';
    if (client.status === ClientStatus.ACTIVE) {
      output = 'Active';
    } else if (client.status === ClientStatus.REFUSED) {
      output = 'Refused';
    } else if (client.status === ClientStatus.PROCESSED) {
      output = 'Processed';
    }
    return output;
  };

  const renderDate = (client: ClientInterface) => {
    if (!client.createdAt) {
      return '-';
    }
    const date = new Date(client.createdAt);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return {
    renderClientRole,
    renderClientStatus,
    renderGender,
    renderDate,
  };
};
