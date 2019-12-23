import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const TopMenu = (props) => {
  const history = useHistory();
  if (props.isLogged) {
    return (
        <React.Fragment>
          {props.currentUser.name}
        </React.Fragment>
    );
  } else {
    return (
        <React.Fragment>
          <Button color="inherit" onClick={(e) => {
            history.push('/signin');
          }}>Sign In</Button>
          <Button color="inherit" onClick={(e) => {
            history.push('/signup');
          }}>Sign Up</Button>
        </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.user.currentUser !== null,
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(TopMenu);
