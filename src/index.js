import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './store/reducers';
import getRoutes from './routes';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
  return (
    <div className='content'>
      <div className='container'>
        <Provider store={store}>{getRoutes()}</Provider>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
