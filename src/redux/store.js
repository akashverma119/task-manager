import taskReducer from "./task/taskReducer";
import { applyMiddleware, legacy_createStore as  createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from "./rootSaga";


const sagaMiddleware = createSagaMiddleware(); 
const store = createStore(
  taskReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
export default store;