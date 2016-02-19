import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const finalCreateStore = compose(
	applyMiddleware(thunk)(createStore)
)(createStore);

export default function configureStore(reducer, initialState) {
  return finalCreateStore(reducer, initialState);
}
