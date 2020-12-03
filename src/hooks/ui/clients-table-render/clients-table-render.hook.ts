import { ClientInterface } from '../../../interfaces/client.interface';
import { ClientRole, ClientStatus, Gender, UserRole } from '../../../interfaces/generated/globalTypes';
import { SlotInterface } from '../../../interfaces/load.interface';

export const useTableColumnRender = () => {

  const renderClientRole = (client: ClientInterface) => {
    let output = '';
    if (client.role === ClientRole.TANDEM) {
      output = 'TM Passenger';
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

  const renderSlotRole = (slot: SlotInterface) => {
    let output = '';
    switch (slot.role) {
      case UserRole.CAMERAMAN:
        output = 'Cameraman';
        break;
      case UserRole.STUDENT:
        output = 'Student';
        break;
      case UserRole.COACH:
        output = 'Coach';
        break;
      case UserRole.AS_A_PASSENGER:
        output = 'Passenger';
        break;
      case UserRole.TANDEM:
        output = 'TM Passenger';
        break;
      case UserRole.SKYDIVER:
        output = 'Sport';
        break;
      case UserRole.STATIC_LINE:
        output = 'Static Line';
        break;
      case UserRole.TM:
        output = 'TM Instructor';
        break;
    }
    return output;
  };

  return {
    renderClientRole,
    renderClientStatus,
    renderGender,
    renderDate,
    renderSlotRole,
  };
};
