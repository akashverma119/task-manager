import { ADD_TASK,UPDATE_TASK, REMOVE_TASK } from "./taskTypes";
import { fakedata } from "../../data/data";
const initailState = {
  tasks:fakedata
}

const taskReducer=(state = initailState, action)=>{
  switch(action.type){
    case ADD_TASK:return{
      tasks:[...state.tasks, action.payload]
    }
    case UPDATE_TASK:
      const prevTask = state.tasks;
      prevTask[action.payload.id]=action.payload.task;
      return{ 
      tasks:prevTask
    }
    case REMOVE_TASK:return{
      tasks:state.tasks.filter((value,index)=>index!=action.payload)
    }
    default:return state
  }
}

export default taskReducer;