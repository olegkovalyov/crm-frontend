import { useDispatch } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { BreadcrumbsDataInterface } from '../../../interfaces/ui.interface';
import { setBreadcrumbsDataAction } from '../../../redux/ui/ui.actions';
import { breadcrumbsMap, NO_MATCH_URL, routePaths } from '../../../constants/route.constants';

interface dataFetchFn {
  (): void
}

export const useDataFetch = () => {

  const fetchData = () => {

  };

};
