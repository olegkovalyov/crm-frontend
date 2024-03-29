import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/common/auth/auth.selector';
import { GetStaff } from '../../../../interfaces/generated/GetStaff';
import { UserInterface, StaffInterface } from '../../../../interfaces/user.interface';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import getStaffQuery from './gql/get-staff.query.graphql';

export const useGetStaffQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  let staff: StaffInterface[] = [];
  const [_getStaffAsync, { loading, data }] = useLazyQuery<GetStaff, null>(getStaffQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  if (data && data.getStaff) {
    staff = data.getStaff.filter(x => x != null) as UserInterface[];
  }

  const getStaffAsync = async () => {
    try {
      await _getStaffAsync();
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };


  return {
    isLoadingStaff: loading,
    staffData: staff,
    getStaffErrorMessage: errorMessage,
    getStaffAsync,
  };
};
