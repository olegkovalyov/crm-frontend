import React, { ReactElement } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link as RouterLink, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../content/content.styles';
import { breadcrumbsMap, DASHBOARD_URL, EDIT_USER_URL } from '../../../constants/route.constants';


export const SimpleBreadcrumbs = (): ReactElement => {
  const classes = useStyles();

  const isEmptyLink = (url: string): boolean => {
    const emptyLinks = [
      EDIT_USER_URL,
    ];
    return emptyLinks.includes(url);
  };

  const prepareLink = (url: string) => {
    if (url.includes(EDIT_USER_URL)) {
      return EDIT_USER_URL;
    }
    if (url.includes(DASHBOARD_URL)) {
      return '';
    }
    return url;
  };


  return (
    <Route>
      {({ location }) => {
        const pathNames = prepareLink(location.pathname).split('/').filter(x => x);
        return (
          <Breadcrumbs aria-label="Breadcrumb" className={classes.breadcrumbs}>
            <RouterLink color="inherit" to={DASHBOARD_URL}>
              Dashboard
            </RouterLink>
            {pathNames.map((value, index) => {
              const isLast = index === pathNames.length - 1;
              let url = `/${pathNames.slice(0, index + 1).join('/')}`;
              url = prepareLink(url);
              const breadCrumbTitle = breadcrumbsMap[url];
              return (isLast
                || isEmptyLink(url)) ?
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
