
import { React,useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Detail.css'
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../redux';

const Detail = () => {
	const index= useParams()?.id;
	const dispatch = useDispatch();
	const tasks = useSelector(state=>state.tasks);
	const [task,setTask] = useState(tasks[index]);
	const navigate = useNavigate();
	const handleEdit= (event) =>
	{
		event.preventDefault();
		console.log("new",task)
		dispatch(updateTask(index, task));
		console.log("updated", tasks[index]);
		navigate('../')
	}

	const formRender=()=>{
		return(<form >
			<label>Status:
				<select defaultValue={task.status==0?'Pending':'Completed'} onChange={(e)=>(setTask({...task, status:(e.target.value==='Completed'?1:0)}))}>
					<option>Completed</option>
					<option>Pending</option>
				</select>
			</label>
			<label>Title:<input type="text" value={task.title || ""} onChange={(e)=>setTask({...task , title:e.target.value})} /></label>
			<label>Detail:<input type="text" value={task.detail || ""} onChange={(e)=>setTask({...task , detail:e.target.value})} /></label>
			<label>Priority:
			<select defaultValue={task.priority} onChange={(e)=>(setTask({...task, priority:e.target.value}))}>
				<option>urgent</option>
				<option>elective</option>
			</select>
			</label>
			<label>Deadline:<input type="datetime-local" value={task.deadline || ""} onChange={(e)=>setTask({...task , deadline:e.target.value})} /></label>
			<button onClick={(e)=>handleEdit(e)}>EDIT</button>
		</form>);
	}
	
	return (
		<>
			<div className='createDetailForm'>
				{formRender()}
			</div>
		</>
	)
}

export default Detail