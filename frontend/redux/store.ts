import { applyMiddleware, compose, createStore } from "redux";
import reducers from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// @ts-ignore
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk, logger)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;