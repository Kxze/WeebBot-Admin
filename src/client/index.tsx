import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from "redux-thunk";
import { rootReducer } from "./Reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { login, getWarning } from './Actions';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));
store.dispatch(login());
store.dispatch(getWarning());

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
