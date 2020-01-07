import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SignIn from '../../pages/signin/signin.component';
import SignUp from '../../pages/signup/signup.component';
import Home from '../../pages/home/home.component';
import PrivateRoute from '../../shared/private-route.component';
import Container from '@material-ui/core/Container';
import NotFound from '../../pages/not-found/not-found.component';

const Content = (props) => {
  return (
      <Container component="main" maxWidth="xs">
        <Switch>
          <PrivateRoute exact path="/">
            <Home/>
          </PrivateRoute>
          <PrivateRoute exact path="/home">
            <Home/>
          </PrivateRoute>
          <Route exact path="/signin">
            <SignIn/>
          </Route>
          <Route exact path="/signup">
            <SignUp/>
          </Route>
          <Route component={NotFound}/>
        </Switch>
      </Container>
  );
};

export default Content;
