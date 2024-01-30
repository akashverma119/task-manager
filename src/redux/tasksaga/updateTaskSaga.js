import { takeLatest,put,call } from "redux-saga/effects";
import { UPDATE_TASK } from "../task/taskTypes";
import { updateTaskFailure,updateTaskSuccess } from "../task/taskActions";
import axios from "axios";
function* onUpdateTask(data)
{
  try 
  {
    const response = yield call(axios.put, [`http://localhost:3600/tasks/${data.payload.id}`],data.payload.task);
    if(response.status>=200 && response.status<300){
      yield put(updateTaskSuccess());
    }
    else {
      const error = new Error("Something went wrong")
      error.code = response.status;
      throw error;
    }
  } 
  catch(e) 
  {
    yield put(updateTaskFailure(e));
  }
}

export default function* updateTaskSaga() {
  yield takeLatest(UPDATE_TASK, onUpdateTask);
}