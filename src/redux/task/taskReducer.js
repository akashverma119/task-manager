import { ADD_TASK,UPDATE_TASK, REMOVE_TASK, FETCH_TASK, RECEIVE_TASK_FAILURE, RECEIVE_TASK_SUCCESS} from "./taskTypes";
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
      return{...state,  tasks:[...state.tasks, action.payload] }

    case UPDATE_TASK:
      const prevTask = state.tasks;
      prevTask.map((obj)=> obj.id===action.payload.id?action.payload.task:obj);
      return{...state, tasks:prevTask }

    case REMOVE_TASK:
      return{...state, tasks:state.tasks.filter((obj)=>obj.id!=action.payload) }

    default:return state
  }
}

export default taskReducer;