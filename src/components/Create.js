import React, { useState } from 'react'
import './Create.css'
import { connect } from 'react-redux';
import { addTask } from '../redux';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

const Create = (props) => {
	const [task,setTask] = useState({status:0});
	const navigate = useNavigate();
	const handleSubmit= (event) =>
	{
		event.preventDefault();
		const id = nanoid();
		setTask(task.id = id)
		console.log(task)
		props.addTask(task);
		navigate('../');
	}

	const formRender=()=>{
		return(
			<form onSubmit={(event)=>handleSubmit(event)}>
				<label>Title:<input placeholder='Add a Title' type="text" value={task.title || ""} onChange={(e)=>setTask({...task , title:e.target.value})} /></label>
				<label>Detail:<input placeholder='Add Details' type="text" value={task.detail || ""} onChange={(e)=>setTask({...task , detail:e.target.value})} /></label>
				<label>Priority:
				<select value={task.priority || ""} onChange={(e)=>(setTask({...task, priority:e.target.value}))}>
					<option>urgent</option>
					<option>elective</option>
				</select>
				</label>
				<label>Deadline:<input type="datetime-local" value={task.deadline || ""} onChange={(e)=>setTask({...task , deadline:e.target.value})} /></label>
				<input type='submit'></input>
			</form>
		);
	}
	return (
	<>
		<div className='createTaskForm'>
			{formRender()}
		</div>
	</>
	)
}

const mapStateToProp = () =>{
	return{}
}
const mapDispatchToProp = (dispatch)=>{
	return {
		addTask: (data)=> dispatch(addTask(data)),
	}
}

export default connect(
	mapStateToProp,
	mapDispatchToProp,
)(Create)
