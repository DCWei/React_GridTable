import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistState} from 'redux-devtools';
import DevTools from './DevTools';

const finalCreateStore = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunk),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument(),
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(reducer, initialState) {
  return finalCreateStore(reducer, initialState);
}