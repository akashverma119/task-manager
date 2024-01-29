
import { React,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Detail.css'
import { connect } from 'react-redux';
import { updateTask } from '../redux';
import { taskSelector } from '../selectors/selectors';

const Detail = (props) => {
	const index= useParams()?.id;
	const tasks = props.tasks;
	const [task,setTask] = useState(tasks.find((obj)=>obj.id==index));
	const navigate = useNavigate();
	const handleEdit= (event) =>
	{
		event.preventDefault();
		console.log("new",task)
		props.updateTask(index, task);
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

const mapStateToProp = (state)=> {
	return {
		tasks: taskSelector(state)
	}
}


const mapDispatchToProp = (dispatch)=>{
	return {
		updateTask: (id,task)=> dispatch(updateTask(id,task)),
	}
}

export default connect(
	mapStateToProp,
	mapDispatchToProp,
)(Detail)