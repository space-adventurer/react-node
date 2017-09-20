/**
 * Data layer control with Redux.
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Middlewares.
import reduxThunk from 'redux-thunk';

// Material CSS module.
import 'materialize-css/dist/css/materialize.min.css';

// Components.
import App from './components/App';

// Reducers.
import reducers from './reducers';

// Create Application store.
const store = createStore(
    reducers,
    {},
    applyMiddleware(reduxThunk)
 );

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
