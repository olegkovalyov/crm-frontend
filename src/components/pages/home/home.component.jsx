import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import {connect} from 'react-redux';
import {fetchPlansStart} from '../../../redux/plan/plan.actions';
import {getPlanErrorMessage, getPlans} from '../../../redux/plan/plan.selector';

const Home = (props) => {
  const [loadedPlans, setLoadedPlans] = useState(false);
  useEffect(() => {
    if (!loadedPlans) {
      props.fetchPlans();
      setLoadedPlans(true);
    }
  }, [loadedPlans, props]);
  return (
      <React.Fragment>
        <CssBaseline/>
        <Typography variant="h1" component="h1">
          Home
        </Typography>
      </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    plans: getPlans(state),
    errorMessage: getPlanErrorMessage(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlans: () => dispatch(fetchPlansStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
