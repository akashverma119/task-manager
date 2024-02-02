import React, { useState } from 'react'
import './Create.css'
import { connect } from 'react-redux';
import { addTask } from '../redux';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import Input from './atoms/Input';
import Select from './atoms/Select';

const Create = (props) => {
	const [task,setTask] = useState({status:0});
	const navigate = useNavigate();
	const handleSubmit= (event) =>
	{
		event.preventDefault();
		const id = nanoid();
		setTask(task.id = id)
		props.addTask(task);
		navigate('../');
	}

	const handleTitle = (event) =>{
		setTask({...task , title:event.target.value})
	}
	const handleDetail = (event) =>{
		setTask({...task , detail:event.target.value})
	}
	const handleDeadline = (event) =>{
		setTask({...task , deadline:event.target.value})
	}
	const handlePriority = (event) =>{
		setTask({...task , priority:event.target.value})
	}
	const priorityOptions = ["urgent", "elective"];
	const formRender=()=>{
		return(
			<form onSubmit={(event)=>handleSubmit(event)}>
				<label>Title:
					<Input placeholder='Add a Title' type="text" value={task.title || ""} onChange={handleTitle}></Input>
				</label>
				<label>Detail:
					<Input placeholder='Add Details' type="text" value={task.detail || ""} onChange={handleDetail} />
				</label>
				<label>Priority:
					<Select defaultValue={task.priority || ""} options={priorityOptions} onChange={handlePriority}/>
				</label>
				<label>Deadline:
					<Input  type="datetime-local" value={task.deadline || ""} onChange={handleDeadline} />
				</label>
				<Input type='submit'></Input>
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
