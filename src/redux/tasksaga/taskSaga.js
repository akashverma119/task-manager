import { takeLatest,put,call } from "redux-saga/effects";
import { FETCH_TASK } from "../task/taskTypes";
import { receiveTaskFailure,receiveTaskSuccess } from "../task/taskActions";
import axios from "axios";
function* onFetchTask()
{
  try 
  {
    const response = yield call(axios.get, ['http://localhost:3500/tasks']);
    yield put(receiveTaskSuccess(response.data));
  } 
  catch(e) 
  {
    yield put(receiveTaskFailure(e));
  }
}

export default function* fetchTaskSaga() {
  yield takeLatest(FETCH_TASK, onFetchTask);
}