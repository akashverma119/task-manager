import { takeLatest,put,call } from "redux-saga/effects";
import { REMOVE_TASK } from "../task/taskTypes";
import { removeTaskFailure,removeTaskSuccess } from "../task/taskActions";
import axios from "axios";
function* onRemoveTask(data)
{
  try 
  {
    const response = yield call(axios.delete, [`http://localhost:3600/tasks/${data.payload.id}`]);
    yield put(removeTaskSuccess());
  } 
  catch(e) 
  {
    yield put(removeTaskFailure(e));
  }
}

export default function* removeTaskSaga() {
  yield takeLatest(REMOVE_TASK, (data)=>onRemoveTask(data));
}