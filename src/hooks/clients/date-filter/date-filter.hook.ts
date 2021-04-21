import { useDispatch, useSelector } from 'react-redux';
import { getCreatedAtMaxForFilter, getCreatedAtMinForFilter } from '../../../redux/clients/clients.selector';
import { RootStateInterface } from '../../../redux/root.reducer';
import { setCreatedAtMaxForFilterAction, setCreatedAtMinForFilterAction } from '../../../redux/clients/clients.actions';

export const useDateFilter = () => {

  const dispatch = useDispatch();

  const createdDateMin = useSelector((state: RootStateInterface) => getCreatedAtMinForFilter(state));
  const createdDateMax = useSelector((state: RootStateInterface) => getCreatedAtMaxForFilter(state));

  const handleCreatedDateMinChange = (value: Date | null) => {
    if (value) {
      dispatch(setCreatedAtMinForFilterAction(value));
    }
  };

  const handleCreatedDateMaxChange = (value: Date | null) => {
    if (value) {
      dispatch(setCreatedAtMaxForFilterAction(value));
    }
  };

  return {
    createdDateMin,
    createdDateMax,
    handleCreatedDateMinChange,
    handleCreatedDateMaxChange,
  };
};
