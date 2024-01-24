import { ADD_TASK, REMOVE_TASK, UPDATE_TASK } from "./taskTypes";

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

export {addTask, removeTask, updateTask};