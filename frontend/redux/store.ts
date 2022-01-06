import { applyMiddleware, compose, createStore } from "redux";
import reducers from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const store = createStore(reducers, applyMiddleware(logger, thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;