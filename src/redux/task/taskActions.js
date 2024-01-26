import { ADD_TASK, REMOVE_TASK, UPDATE_TASK, FETCH_TASK, RECEIVE_TASK_FAILURE, RECEIVE_TASK_SUCCESS } from "./taskTypes";

const addTask = (data) =>
{
  return{
    type: ADD_TASK,
    payload : data
  }
};

const removeTask = (id) =>
{
  return {
    type: REMOVE_TASK,
    payload : id
  }
};

const updateTask = (id,task) =>
{
  return{
    type: UPDATE_TASK, 
    payload : {
      id,
      task
    }
  } 
};

export const fetchTask = () => ({
  type: FETCH_TASK,
});

export const receiveTaskSuccess = (data) => ({
  type: RECEIVE_TASK_SUCCESS,
  payload :{
    data
  }
});

export const receiveTaskFailure = (err) => ({
  type: RECEIVE_TASK_FAILURE,
  payload :{
    err
  }
});


export {addTask, removeTask, updateTask};