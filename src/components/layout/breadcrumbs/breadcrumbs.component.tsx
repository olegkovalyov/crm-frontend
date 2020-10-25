import React, { ReactElement } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link as RouterLink, Route, matchPath } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../content/content.styles';
import {
  breadcrumbsMap,
  HOME_URL, NO_MATCH_URL, routePaths,
} from '../../../constants/route.constants';


export const SimpleBreadcrumbs = (): ReactElement => {
  const classes = useStyles();

  return (
    <Route>
      {({ location }) => {
        const pathNames = location.pathname.split('/').filter(x => x);
        return (
          <Breadcrumbs aria-label="Breadcrumb" className={classes.breadcrumbs}>
            <RouterLink color="inherit" to={HOME_URL}>
              Home
            </RouterLink>
            {pathNames.map((value, index) => {
              const isLast = index === pathNames.length - 1;
              const url = `/${pathNames.slice(0, index + 1).join('/')}`;
              let breadCrumbTitle = null;

              routePaths.forEach(path => {
                if (path !== NO_MATCH_URL
                  && matchPath(url, {
                    path,
                    exact: true,
                  })) {
                  breadCrumbTitle = breadcrumbsMap[path];
                }
              });

              if(!breadCrumbTitle) {
                return '';
              }

              return isLast ?
                (
                  <Typography color="textPrimary" key={url}>
                    {breadCrumbTitle}
                  </Typography>
                ) : (
                  <RouterLink color="inherit" to={url} key={url}>
                    {breadCrumbTitle}
                  </RouterLink>
                );
            })}
          </Breadcrumbs>
        );
      }}
    </Route>);
};
