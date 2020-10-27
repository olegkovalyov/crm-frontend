import React, { FC } from 'react';
import { Switch } from 'react-router-dom';
import { RouteInterface } from '../../../interfaces/routes.interface';
import RouteWithSubRoutes from '../sub-route/sub-route.component';

interface IProps {
  routes: RouteInterface[];
}

const AppRouter: FC<IProps> = ({ routes }) => {
  return <Switch>{routes.map((route: RouteInterface) => <RouteWithSubRoutes key={route.path} {...route} />)}</Switch>;
};

export default AppRouter;
