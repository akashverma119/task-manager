import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './List.css';
import { connect } from 'react-redux';
import { removeTask, updateTask, fetchTask } from '../redux';
import { taskSelector } from '../selectors/selectors';

const List = (props) => {
	const tasks = props.tasks

	const handleFilter=()=>{
		tasks.filter((obj) => obj.status===1)
	}
	
	useEffect(()=>{
		props.fetchTask();
	},[tasks])

	function handleDelete(index)
	{
		props.removeTask(index)
	}

	const handlePriority = (event, index) =>
	{
		const newTask = tasks.find((obj) => obj.id===index);
		newTask.priority = event.target.value;
		props.updateTask(index,newTask)
	}

	const handleStatus = (event, index) =>
	{
		const newTask = tasks.find((obj) => obj.id===index);
		newTask.status = event.target.value==='Completed'?1:0;
		props.updateTask(index,newTask)
	}

	const handleDeadline = (event, index) =>
	{
		const newTask = tasks.find((obj) => obj.id===index);
		newTask.deadline=event.target.value;
		props.updateTask(index,newTask)
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
			<td className='delete-button'><button onClick={()=>handleDelete(tasks[index].id)}>X</button></td>

			
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

const mapStateToProp = (state)=> {
	return {
		tasks: taskSelector(state)
	}
}


const mapDispatchToProp = (dispatch)=>{
	return {
		fetchTask: ()=> dispatch(fetchTask()),
		updateTask: (id,task)=> dispatch(updateTask(id,task)),
		removeTask: (id)=> dispatch(removeTask(id)),
	}
}

export default connect(
	mapStateToProp,
	mapDispatchToProp,
)(List)