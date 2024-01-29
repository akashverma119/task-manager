import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './List.css';
import { connect } from 'react-redux';
import { removeTask, updateTask, fetchTask, changeSearch } from '../redux';
import { fileteredTaskSelector, taskSelector } from '../selectors/selectors';

const List = (props) => {
	const tasks = props.tasks

	const handleSearch=(event)=>{
		props.changeSearch(event.target.value)
		console.log(props.filteredTask)
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

	const tableRows = props.filteredTask.map((element,index) => {
		return (
		<tr className="items" key={props.filteredTask[index].id}>
			
			<td><Link to={`/detail/${props.filteredTask[index].id}`}>{element.title}</Link></td>
			
			<td>
				<select defaultValue={element.priority} onChange={(event) => handlePriority(event, props.filteredTask[index].id)}>
					<option>urgent</option>
					<option>elective</option>
				</select>	
			</td>
			<td><input type="datetime-local" defaultValue={element.deadline || ""} onChange={(event)=>handleDeadline(event, props.filteredTask[index].id)} /></td>
			<td>
				<select defaultValue={element.status==1?"Completed":"Pending"} onChange={(event) => handleStatus(event, props.filteredTask[index].id)}>
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
				<input id='search-box' type='text' placeholder='Search' onChange={(e)=>handleSearch(e)}></input>
				<h1>Your Daily Tasks</h1>
				{tableRender()}
			</div>
		</>
	)
}

const mapStateToProp = (state)=> {
	return {
		tasks: taskSelector(state),
		search: state.search,
		filteredTask: fileteredTaskSelector(state),
	}
}


const mapDispatchToProp = (dispatch)=>{
	return {
		fetchTask: ()=> dispatch(fetchTask()),
		updateTask: (id,task)=> dispatch(updateTask(id,task)),
		removeTask: (id)=> dispatch(removeTask(id)),
		changeSearch: (val)=> dispatch(changeSearch(val)),
	}
}

export default connect(
	mapStateToProp,
	mapDispatchToProp,
)(List)