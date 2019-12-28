import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {AccountCircle} from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  userName: {
    position: 'relative',
    marginLeft: '40%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
      display: 'block',
    },
  },
  topMenuIcon: {
    position: 'relative',
    marginLeft: '70%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
}));

const TopMenu = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTopMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleTopMenuClose = () => {
    setAnchorEl(null);
  };

  const isTopMenuOpen = Boolean(anchorEl);
  const topMenu = (
      <Menu
          anchorEl={anchorEl}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          id={'primary-search-account-menu'}
          keepMounted
          transformOrigin={{vertical: 'top', horizontal: 'right'}}
          open={isTopMenuOpen}
          onClose={handleTopMenuClose}
      >
        <MenuItem onClick={handleTopMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleTopMenuClose}>Logout</MenuItem>
      </Menu>
  );

  const topPanelForLogged = <React.Fragment>
    <Typography className={classes.userName} variant="h6">
      {props.currentUser ? props.currentUser.name : ''}
    </Typography>
    <IconButton
        className={classes.topMenuIcon}
        edge="end"
        aria-label="account of current user"
        aria-controls={'primary-search-account-menu'}
        aria-haspopup="true"
        onClick={handleTopMenuOpen}
        color="inherit"
    >
      <AccountCircle/>
    </IconButton>
    {topMenu}
  </React.Fragment>;

  const topPanelForAnonymous = <React.Fragment>
    <Button color="inherit" onClick={(e) => {
      history.push('/signin');
    }}>Sign In</Button>
    <Button color="inherit" onClick={(e) => {
      history.push('/signup');
    }}>Sign Up</Button>
  </React.Fragment>;

  return props.isLogged ? topPanelForLogged : topPanelForAnonymous;
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.user.currentUser !== null,
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(TopMenu);
