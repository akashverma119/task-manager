import React, { useState } from 'react'
import Navbar from './Navbar'
import './Create.css'
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, updateTask } from '../redux';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

const Create = () => {
	const [task,setTask] = useState({status:0});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleSubmit= (event) =>
	{
		event.preventDefault();
		const id = String(nanoid());
		setTask(task.id = id)
		dispatch(addTask(task));
		navigate('../');
	}
	// console.log(useSelector(state=>state.tasks))
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

export default Create