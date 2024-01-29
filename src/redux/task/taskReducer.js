import { ADD_TASK,UPDATE_TASK, REMOVE_TASK, FETCH_TASK, RECEIVE_TASK_FAILURE, RECEIVE_TASK_SUCCESS , ADD_TASK_FAILURE, ADD_TASK_SUCCESS, UPDATE_TASK_FAILURE, UPDATE_TASK_SUCCESS, REMOVE_TASK_FAILURE, REMOVE_TASK_SUCCESS} from "./taskTypes";
import { fakedata } from "../../data/data";
const initailState = {
  tasks:[],
  error: null,
  loading : false
}

const taskReducer=(state = initailState, action)=>{
  switch(action.type){

    case FETCH_TASK:
      return { ...state, error: null, loading: true };

    case RECEIVE_TASK_SUCCESS:
      return { ...state, tasks:action.payload.data, error: null, loading: false };

    case RECEIVE_TASK_FAILURE:
      return { ...state, tasks:[] , error:action.payload.err, loading: false };

    case ADD_TASK:
      return { ...state, error: null, loading: true };

    case ADD_TASK_SUCCESS:
      return { ...state, error: null, loading: false };

    case ADD_TASK_FAILURE:
      return { ...state, error:action.payload.err, loading: false };

    case UPDATE_TASK:
      return { ...state, error: null, loading: true };

    case UPDATE_TASK_SUCCESS:
      return { ...state, error: null, loading: false };

    case UPDATE_TASK_FAILURE:
      return { ...state, error:action.payload.err, loading: false };

    case REMOVE_TASK:
      return { ...state, error: null, loading: true };

    case REMOVE_TASK_SUCCESS:
      return { ...state, error: null, loading: false };

    case REMOVE_TASK_FAILURE:
      return { ...state, error:action.payload.err, loading: false };

    default:return state
  }
}

export default taskReducer;