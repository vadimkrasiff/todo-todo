import thunkMiddleware from "redux-thunk";
import { combineReducers, legacy_createStore, applyMiddleware, compose } from "redux";
import tasksReducer from "./tasks-reducer";
import taskReducer from "./task-reducer";

let reducers  = combineReducers({
    tasks: tasksReducer,
    task: taskReducer
});

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware )));



export default store;