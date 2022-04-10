import { useSelector } from 'react-redux';
import { RootStateInterface } from '../../../redux/store';

export const useCurrentUser = () => {
  const currentUser = useSelector((state: RootStateInterface) => state.auth.currentUser);
  return {
    currentUser,
  };
};