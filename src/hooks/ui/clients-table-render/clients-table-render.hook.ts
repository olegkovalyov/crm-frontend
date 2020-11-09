import { ClientInterface } from '../../../interfaces/client.interface';
import { ClientStatus, ClientType, Gender } from '../../../interfaces/generated/globalTypes';

export const useClientsTableRender = () => {

  const renderClientType = (client: ClientInterface) => {
    let output = '';
    if (client.type === ClientType.TANDEM) {
      output = 'TM';
      if (client.withCameraman || client.withHandCameraVideo) {
        const videoOptions: string[] = [];
        if (client.withCameraman) {
          videoOptions.push('Cameraman');
        }
        if (client.withHandCameraVideo) {
          videoOptions.push('Hand video');
        }
        if (videoOptions.length) {
          output += `(${videoOptions.join(',')})`;
        }
      }
    } else if (client.type === ClientType.AS_A_PASSENGER) {
      output = 'Passenger';
    } else if (client.type === ClientType.STATIC_LINE) {
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
    renderClientType,
    renderClientStatus,
    renderGender,
    renderDate,
  };
};
