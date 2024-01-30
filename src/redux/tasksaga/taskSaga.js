import { takeLatest,put,call } from "redux-saga/effects";
import { FETCH_TASK } from "../task/taskTypes";
import { receiveTaskFailure,receiveTaskSuccess } from "../task/taskActions";
import axios from "axios";
function* onFetchTask()
{
  try 
  {
    const response = yield call(axios.get, ['http://localhost:3600/tasks']);
    if(response.status>=200 && response.status<300){
      yield put(receiveTaskSuccess(response.data));
    }
    else {
      const error = new Error("Something went wrong")
      error.code = response.status;
      throw error;
    }
  } 
  catch(e) 
  {
    yield put(receiveTaskFailure(e));
  }
}

export default function* fetchTaskSaga() {
  yield takeLatest(FETCH_TASK, onFetchTask);
}