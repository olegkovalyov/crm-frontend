import React, { FC } from 'react';
import { Switch } from 'react-router-dom';
import { IRoute } from '../../../interfaces/routes.interface';
import RouteWithSubRoutes from '../sub-route/sub-route.component';

interface IProps {
  routes: IRoute[];
}

const AppRouter: FC<IProps> = ({ routes }) => {
  return <Switch>{routes.map((route: IRoute) => <RouteWithSubRoutes key={route.path} {...route} />)}</Switch>;
};

export default AppRouter;
