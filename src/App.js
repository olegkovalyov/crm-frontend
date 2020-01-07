import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import Header from './components/layout/header/header.component';
import Content from './components/layout/content/content.component';
import Footer from './components/layout/footer/footer.component';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const App = (props) => {
  const classes = useStyles();
  return (
      <Provider store={store}>
        <BrowserRouter>
          <PersistGate persistor={persistor}>
            <div className={classes.root}>
              <Header/>
              <Content/>
              <Footer/>
            </div>
          </PersistGate>
        </BrowserRouter>
      </Provider>
  );
};

export default App;
