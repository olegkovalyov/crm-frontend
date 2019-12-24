import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SignIn from '../../pages/signin/signin.component';
import SignUp from '../../pages/signup/signup.component';
import Home from '../../pages/home/home.component';
import Container from '@material-ui/core/Container';

const Content = (props) => {
  return (
      <Container component="main" maxWidth="xs">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/signin">
            <SignIn/>
          </Route>
          <Route exact path="/signup">
            <SignUp/>
          </Route>
        </Switch>
      </Container>
  );
};

export default Content;
