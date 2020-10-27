import React, { ReactElement } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link as RouterLink, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStyles } from '../content/content.styles';
import { HOME_URL } from '../../../constants/route.constants';
import { RootStateInterface } from '../../../redux/root.reducer';
import { getBreadcrumbsDataSelector } from '../../../redux/ui/ui.selector';
import { useBreadcrumbs } from '../../../hooks/core/breadcrumbs/breadcrumbs.hook';


export const SimpleBreadcrumbs = (): ReactElement => {
  const classes = useStyles();

  const {
    getBreadcrumbsTitle,
  } = useBreadcrumbs();

  const breadcrumbsData = useSelector((state: RootStateInterface) => getBreadcrumbsDataSelector(state));

  return (
    <Route>
      {({ location }) => {
        const pathNames = location.pathname.split('/').filter(x => x);
        // console.log(pathNames);
        return (
          <Breadcrumbs aria-label="Breadcrumb" className={classes.breadcrumbs}>
            <RouterLink color="inherit" to={HOME_URL}>
              Home
            </RouterLink>
            {pathNames.map((currentPathPart, index) => {

              const url = `/${pathNames.slice(0, index + 1).join('/')}`;
              const breadcrumbTitle = getBreadcrumbsTitle(
                pathNames,
                index,
                breadcrumbsData,
                currentPathPart,
                url,
              );

              if (!breadcrumbTitle) {
                return '';
              }
              return <RouterLink color="inherit" to={url} key={url}>
                {breadcrumbTitle}
              </RouterLink>;
            })}
          </Breadcrumbs>
        );
      }}
    </Route>);
};
