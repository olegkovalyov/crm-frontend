import React from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import SignIn from '../../pages/signin/signin.component';
import SignUp from '../../pages/signup/signup.component';
import Home from '../../pages/home/home.component';
import PrivateRoute from '../../shared/private-route.component';
import Container from '@material-ui/core/Container';
import NotFound from '../../pages/not-found/not-found.component';
import {CSSTransition, SwitchTransition} from 'react-transition-group';
import '../../../styles/animations.styles.css';

const Content = (props) => {
  const location = useLocation();
  return (
      <Container component="main" maxWidth="xs">
        <SwitchTransition>
          <CSSTransition
              key={location.pathname}
              timeout={300}
              classNames={'page'}
          >
            <Switch location={location}>
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
          </CSSTransition>
        </SwitchTransition>
      </Container>
  );
};

export default Content;
