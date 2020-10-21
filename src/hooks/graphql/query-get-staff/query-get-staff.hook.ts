import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../redux/root.reducer';
import { getAccessToken } from '../../../redux/auth/auth.selector';
import { GetStaff, GetStaff_getStaff } from '../../../interfaces/generated/GetStaff';
import { UserInterface } from '../../../interfaces/user.interface';

const queryGetStaff = loader('./gql/queryGetStaff.graphql');

export const useQueryGetStaff = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));

  let staff: GetStaff_getStaff[] = [];
  const [getStaffAsync, { loading, data, error }] = useLazyQuery<GetStaff, null>(queryGetStaff,
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


  return {
    loading,
    staff,
    error,
    getStaffAsync,
  };
};
