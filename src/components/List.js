import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Create from './Create';
import Navbar from './Navbar';
import './List.css'
import { fakedata } from '../data/data';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, updateTask } from '../redux';

const List = () => {
	const tasks = useSelector(state=>state.tasks);
	console.log(tasks)
	const dispatch = useDispatch();
	function handleDelete(index){
		dispatch(removeTask(index));
	}

	const handlePriority = (event, index) =>
	{
		const newTask = tasks[index];
		newTask.priority = event.target.value;
		dispatch(updateTask(index,newTask))
	}

	const handleStatus = (event, index) =>
	{
		const newTask = tasks[index];
		newTask.status = event.target.value==='Completed'?1:0;
		dispatch(updateTask(index,newTask))
	}

	const handleDeadline = (event, index) =>
	{
		const newTask = tasks[index]
		newTask.deadline=event.target.value;
		dispatch(updateTask(index,newTask))
	}

	const tableRows = tasks.map((element,index) => {
		return (
		<tr className="items" key={index}>
			
			<td><Link to={`/detail/${index}`} state={tasks[index]}>{element.title}</Link></td>
			
			<td>
				<select defaultValue={element.priority} onChange={(event) => handlePriority(event, index)}>
					<option>urgent</option>
					<option>elective</option>
				</select>	
			</td>
			<td><input type="datetime-local" value={element.deadline || ""} onChange={(event)=>handleDeadline(event, index)} /></td>
			<td>
				<select defaultValue={element.status==1?"Completed":"Pending"} onChange={(event) => handleStatus(event, index)}>
					<option>Completed</option>
					<option>Pending</option>
				</select>
			</td>
			<td className='delete-button'><button onClick={()=>handleDelete(index)}>Delete</button></td>

			
		</tr>
		);      
	});

	const tableRender = () =>
	{
		return(
			<table className='table'>
					<thead>
						<tr>
							<th>Title</th>
							<th>Priority</th>
							<th>Deadline</th>
							<th>Status</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{tableRows}
					</tbody>
				</table>
		)
	}

	return (
		<>
			<div className="container">
				<h1>Your Daily Tasks</h1>
				{tableRender()}
			</div>
		</>
	)
}

export default List