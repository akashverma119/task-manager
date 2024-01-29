import { takeLatest,put,call } from "redux-saga/effects";
import { ADD_TASK } from "../task/taskTypes";
import { addTaskSuccess,addTaskFailure } from "../task/taskActions";
import axios from "axios";
function* onAddTask(data)
{
  try 
  {
    const response = yield call(axios.post, ['http://localhost:3600/tasks'],data.payload.task);
    yield put(addTaskSuccess());
  } 
  catch(e) 
  {
    yield put(addTaskFailure(e));
  }
}

export default function* addTaskSaga() {
  yield takeLatest(ADD_TASK, (data)=>onAddTask(data));
}