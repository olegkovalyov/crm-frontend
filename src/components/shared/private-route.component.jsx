import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({children, ...rest}) => {
  return (
      <Route
          {...rest}
          render={({location}) =>
              rest.currentUser ?
                  (
                      children
                  ) : (
                      <Redirect
                          to={{
                            pathname: '/signin',
                            state: {from: location},
                          }}
                      />
                  )
          }
      />
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
