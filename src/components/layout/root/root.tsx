import { useStyles } from './root.styles';
import AuthHeader from '../auth/header/header.component';
import React from 'react';
import AdminHeader from '../admin/header/header.component';
import LeftMenu from '../admin/left-menu/left-menu.component';
import { useAccessTokenHandler } from '../../../hooks/auth/access-token-handler/access-token-handler.hook';
import { Container as AuthContainer } from '../auth/container/container.component';
import { Container as AdminContainer } from '../admin/container/container.component';
import { ADMIN_LAYOUT, AUTH_LAYOUT } from '../../../constants/layout.constant';
import { useCurrentUser } from '../../../hooks/auth/current-user/current-user.hook';
import { useInitialAuth } from '../../../hooks/auth/auth-init-handler/auth-init.hook.';
import { Backdrop, CircularProgress } from '@material-ui/core';

export default function Root({ children }) {
  const classes = useStyles();
  const {
    initialAuth,
    layout,
  } = children.props;

  const { currentUser } = useCurrentUser();

  useInitialAuth(initialAuth);
  useAccessTokenHandler();

  if (layout === AUTH_LAYOUT) {
    return (
      <>
        <div className={classes.auth}>
          <AuthHeader />
          <AuthContainer>
            {children}
          </AuthContainer>
        </div>
      </>
    );
  }

  if (layout === ADMIN_LAYOUT) {
    if (!currentUser) {
      return (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      );
    }

    return (
      <>
        <div className={classes.admin}>
          <AdminHeader />
          <LeftMenu />
          <AdminContainer>
            {children}
          </AdminContainer>
        </div>
      </>
    );
  }
}