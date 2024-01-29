import { takeLatest,put,call } from "redux-saga/effects";
import { UPDATE_TASK } from "../task/taskTypes";
import { updateTaskFailure,updateTaskSuccess } from "../task/taskActions";
import axios from "axios";
function* onUpdateTask(data)
{
  try 
  {
    const response = yield call(axios.put, [`http://localhost:3600/tasks/${data.payload.id}`],data.payload.task);
    yield put(updateTaskSuccess());
  } 
  catch(e) 
  {
    yield put(updateTaskFailure(e));
  }
}

export default function* updateTaskSaga() {
  yield takeLatest(UPDATE_TASK, (data)=>onUpdateTask(data));
}