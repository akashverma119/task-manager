import taskReducer from "./task/taskReducer";
import { createStore } from 'redux';

const store = createStore(taskReducer);
export default store;