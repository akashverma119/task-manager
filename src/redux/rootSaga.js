
import { put, takeEvery, all } from 'redux-saga/effects'
import fetchTaskSaga from './tasksaga/taskSaga'
export function *rootSaga(){
  yield all([
    fetchTaskSaga(),
  ])
}