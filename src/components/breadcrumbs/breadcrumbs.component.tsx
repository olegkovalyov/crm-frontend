import React, { ReactElement } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link as RouterLink, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../content/content.styles';
import { breadcrumbNameMap } from '../../constants/url';


export const SimpleBreadcrumbs = (): ReactElement => {
  const classes = useStyles();
  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split('/').filter(x => x);
        return (
          <Breadcrumbs aria-label="Breadcrumb" className={classes.breadcrumbs}>
            <RouterLink color="inherit" to="/">
              Home
            </RouterLink>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              let breadCrumbTitle = breadcrumbNameMap[to];
              if (last
                && to !== '/users/add'
                && to.match('/users/')
              ) {
                breadCrumbTitle = 'Edit';
              }
              return last ? (
                <Typography color="textPrimary" key={to}>
                  {breadCrumbTitle}
                </Typography>
              ) : (
                <RouterLink color="inherit" to={to} key={to}>
                  {breadCrumbTitle}
                </RouterLink>
              );
            })}
          </Breadcrumbs>
        );
      }}
    </Route>);
};
