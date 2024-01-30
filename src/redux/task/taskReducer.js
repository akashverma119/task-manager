import { ADD_TASK,UPDATE_TASK, REMOVE_TASK, FETCH_TASK, RECEIVE_TASK_FAILURE, RECEIVE_TASK_SUCCESS , ADD_TASK_FAILURE, ADD_TASK_SUCCESS, UPDATE_TASK_FAILURE, UPDATE_TASK_SUCCESS, REMOVE_TASK_FAILURE, REMOVE_TASK_SUCCESS, CHANGE_SEARCH, CHANGE_PRIORITY} from "./taskTypes";
import { fromJS } from "immutable";

const initailState = fromJS({
  tasks:[],
  error: null,
  loading : false,
  search : '',
  priority : 'none',
});

const taskReducer=(state = initailState, action)=>{
  switch(action.type){

    case FETCH_TASK:
      return state.set("error", null).set("loading", true);

    case RECEIVE_TASK_SUCCESS:
      return state.set("tasks", action.payload.data).set("error", null).set("loading",false);

    case RECEIVE_TASK_FAILURE:
      return state.set("tasks",[]).set("error",action.payload.err).set("loading",false);

    case ADD_TASK:
      return state.set("error", null).set("loading", true);

    case ADD_TASK_SUCCESS:
      return state.set("error", null).set("loading",false);

    case ADD_TASK_FAILURE:
      return state.set("error",action.payload.err).set("loading",false);

    case UPDATE_TASK:
      return state.set("error", null).set("loading", true);

    case UPDATE_TASK_SUCCESS:
      return state.set("error", null).set("loading",false);

    case UPDATE_TASK_FAILURE:
      return state.set("error",action.payload.err).set("loading",false);

    case REMOVE_TASK:
      return state.set("error", null).set("loading", true);

    case REMOVE_TASK_SUCCESS:
      return state.set("error", null).set("loading",false);

    case REMOVE_TASK_FAILURE:
      return state.set("error",action.payload.err).set("loading",false);

    case CHANGE_SEARCH:
      return state.set("search",action.payload.data)
    
    case CHANGE_PRIORITY:
      return state.set("priority",action.payload.data)

    default:return state
  }
}

export default taskReducer;