import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './List.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, updateTask, fetchTask } from '../redux';

const List = () => {
	const tasks = useSelector(state=>state.tasks);
	const dispatch = useDispatch();
	

	const handleClick=()=>{
		dispatch(fetchTask())
	}

	const handleFilter=()=>{
		tasks.filter((obj) => obj.status===1)
	}
	
	// useEffect(()=>{
	// 	dispatch(fetchTask());
	// },[])

	function handleDelete(index)
	{
		dispatch(removeTask(index));
	}

	const handlePriority = (event, index) =>
	{
		const newTask = tasks.find((obj) => obj.id===index);
		newTask.priority = event.target.value;
		dispatch(updateTask(index,newTask));
	}

	const handleStatus = (event, index) =>
	{
		const newTask = tasks.find((obj) => obj.id===index);
		newTask.status = event.target.value==='Completed'?1:0;
		dispatch(updateTask(index,newTask))
	}

	const handleDeadline = (event, index) =>
	{
		const newTask = tasks.find((obj) => obj.id===index);
		newTask.deadline=event.target.value;
		dispatch(updateTask(index,newTask));
	}

	const tableRows = tasks.map((element,index) => {
		return (
		<tr className="items" key={tasks[index].id}>
			
			<td><Link to={`/detail/${tasks[index].id}`}>{element.title}</Link></td>
			
			<td>
				<select defaultValue={element.priority} onChange={(event) => handlePriority(event, tasks[index].id)}>
					<option>urgent</option>
					<option>elective</option>
				</select>	
			</td>
			<td><input type="datetime-local" defaultValue={element.deadline || ""} onChange={(event)=>handleDeadline(event, tasks[index].id)} /></td>
			<td>
				<select defaultValue={element.status==1?"Completed":"Pending"} onChange={(event) => handleStatus(event, tasks[index].id)}>
					<option>Completed</option>
					<option>Pending</option>
				</select>
			</td>
			<td className='delete-button'><button onClick={()=>handleDelete(tasks[index].id)}>Delete</button></td>

			
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
				<button onClick={()=>handleClick()}>Get all the data</button>
				<button onClick={()=>handleFilter()}>Filter</button>
				<h1>Your Daily Tasks</h1>
				{tableRender()}
			</div>
		</>
	)
}

export default List