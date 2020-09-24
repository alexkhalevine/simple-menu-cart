import { createStore, compose } from 'redux';
import createRootReducer from './reducers';

const store = createStore(
  createRootReducer(),
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;