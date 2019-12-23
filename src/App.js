import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import Header from './components/layout/header/header.component';
import Content from './components/layout/content/content.component';
import Footer from './components/layout/footer/footer.component';

class App extends React.Component {

  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <Header/>
            <Content/>
            <Footer/>
          </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
