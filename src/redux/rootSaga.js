
import { put, takeEvery, all } from 'redux-saga/effects'
import fetchTaskSaga from './tasksaga/taskSaga'
import addTaskSaga from './tasksaga/addTaskSaga'
import updateTaskSaga from './tasksaga/updateTaskSaga'
import removeTaskSaga from './tasksaga/removeTaskSaga'

export function *rootSaga(){
  yield all([
    fetchTaskSaga(),
    addTaskSaga(),
    updateTaskSaga(),
    removeTaskSaga(),
  ])
}