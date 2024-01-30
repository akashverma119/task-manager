import { takeLatest,put,call } from "redux-saga/effects";
import { ADD_TASK } from "../task/taskTypes";
import { addTaskSuccess,addTaskFailure } from "../task/taskActions";
import axios from "axios";
function* onAddTask(data)
{
  try 
  {
    const response = yield call(axios.post, ['http://localhost:3600/tasks'],data.payload.task);
    if(response.status>=200 && response.status<300){
      yield put(addTaskSuccess());
    }
    else {
      const error = new Error("Something went wrong")
      error.code = response.status;
      throw error;
    }
  } 
  catch(e) 
  {
    yield put(addTaskFailure(e));
  }
}

export default function* addTaskSaga() {
  yield takeLatest(ADD_TASK, onAddTask);
}