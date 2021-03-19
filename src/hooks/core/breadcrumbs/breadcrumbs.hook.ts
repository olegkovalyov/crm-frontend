import { useDispatch } from 'react-redux';
import { BreadcrumbsDataInterface } from '../../../interfaces/ui.interface';
import { setBreadcrumbsDataAction } from '../../../redux/ui/ui.actions';
import { breadcrumbsMap, NO_MATCH_URL, routePaths } from '../../../constants/route.constants';

export const useBreadcrumbs = () => {

  const dispatch = useDispatch();

  const setBreadcrumbsCustomData = (pathPart: string, customBreadcrumbTitle: string) => {
    const breadCrumbsData: BreadcrumbsDataInterface = {
      pathPart,
      customBreadcrumbTitle,
    };
    dispatch(setBreadcrumbsDataAction([breadCrumbsData]));
  };

  const getBreadcrumbsTitle = (
    pathNames: string[],
    index: number,
    breadcrumbsData: BreadcrumbsDataInterface[],
    currentPathPart: string,
    url: string,
  ): string | null => {
    let breadcrumbTitle: string | null | undefined = null;
    // // console.log(breadcrumbsData);
    // breadcrumbsData.forEach(data => {
    //   if (data.pathPart === currentPathPart) {
    //     breadcrumbTitle = data.customBreadcrumbTitle;
    //   }
    // });
    // if (!breadcrumbTitle) {
    //   routePaths.forEach(path => {
    //     if (path !== NO_MATCH_URL
    //       && matchPath(url, {
    //         path,
    //         exact: true,
    //       })) {
    //       if (!breadcrumbTitle) {
    //         breadcrumbTitle = breadcrumbsMap[path];
    //       }
    //     }
    //   });
    // }
    return breadcrumbTitle;
  };

  return {
    setBreadcrumbsCustomData,
    getBreadcrumbsTitle,
  };
};
