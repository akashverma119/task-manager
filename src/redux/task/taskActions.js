import { ADD_TASK, REMOVE_TASK, UPDATE_TASK, FETCH_TASK, RECEIVE_TASK_FAILURE, RECEIVE_TASK_SUCCESS, ADD_TASK_FAILURE, ADD_TASK_SUCCESS, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILURE, REMOVE_TASK_FAILURE, REMOVE_TASK_SUCCESS } from "./taskTypes";

export const addTask = (task) =>
{
  return{
    type: ADD_TASK,
    payload :{
      task
    }
  }
};

export const addTaskSuccess = () =>
{
  return {
    type: ADD_TASK_SUCCESS
  }
}

export const addTaskFailure = (err) =>
{
  return {
    type: ADD_TASK_FAILURE,
    payload :{
      err
    }
  }
}

export const removeTask = (id) =>
{
  return {
    type: REMOVE_TASK,
    payload :
    {
      id
    }
  }
};

export const updateTask = (id,task) =>
{
  return{
    type: UPDATE_TASK, 
    payload : {
      id,
      task
    }
  } 
};

export const updateTaskSuccess = () =>
{
  return {
    type: UPDATE_TASK_SUCCESS
  }
}

export const updateTaskFailure = (err) =>
{
  return {
    type: UPDATE_TASK_FAILURE,
    payload :{
      err
    }
  }
}

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

export const removeTaskSuccess = () => ({
  type: REMOVE_TASK_SUCCESS,
});

export const removeTaskFailure = (err) => ({
  type: REMOVE_TASK_FAILURE,
  payload :{
    err
  }
});



