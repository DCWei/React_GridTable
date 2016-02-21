import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const finalCreateStore = compose(
  // Middleware you want to use in production:
  applyMiddleware(thunk)(createStore)
  // Other store enhancers if you use any
)(createStore);

export default function configureStore(reducer, initialState) {
  return finalCreateStore(reducer, initialState);
};