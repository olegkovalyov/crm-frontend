import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { IRootState } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { GetStaff, GetStaff_getStaff } from '../../../../interfaces/generated/GetStaff';
import { UserInterface } from '../../../../interfaces/user.interface';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';

const queryGetStaff = loader('./gql/get-staff.query.graphql');

export const useGetStaffQuery = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  let staff: GetStaff_getStaff[] = [];
  const [_getStaffAsync, { loading, data }] = useLazyQuery<GetStaff, null>(queryGetStaff,
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
