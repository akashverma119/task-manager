import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./List.css";
import { connect } from "react-redux";
import {
  removeTask,
  updateTask,
  fetchTask,
  changeSearch,
  changePriority,
} from "../../redux";
import {
  fileteredTaskSelector,
  loadSelector,
  prioritySelector,
  searchSelector,
  taskSelector,
} from "../../selectors/selectors";
import Select from "../atoms/Select";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const List = (props) => {
  const tasks = props.tasks;
  const handleSearch = (event) => {
    props.changeSearch(event.target.value);
  };

  useEffect(() => {
    props.fetchTask();
  }, []);
  console.log(tasks);
  function handleDelete(index) {
    props.removeTask(index);
    props.fetchTask();
  }

  const handlePriority = (event, index) => {
    const newTask = tasks.find((obj) => obj.id === index);
    newTask.priority = event.target.value;
    props.updateTask(index, newTask);
  };

  const handleStatus = (event, index) => {
    const newTask = tasks.find((obj) => obj.id === index);
    newTask.status = event.target.value === "Completed" ? 1 : 0;
    props.updateTask(index, newTask);
  };

  const handleDeadline = (event, index) => {
    const newTask = tasks.find((obj) => obj.id === index);
    newTask.deadline = event.target.value;
    props.updateTask(index, newTask);
  };
  const priorityOptions = ["urgent", "elective"];
  const statusOptions = ["Pending", "Completed"];
  const tableRows = props.filteredTask.map((element, index) => {
    return (
      <tr className="items" key={props.filteredTask[index].id}>
        <td>
          <Link to={`/detail/${props.filteredTask[index].id}`}>
            {element.title}
          </Link>
        </td>
        <td>
          <Select
            defaultValue={element.priority}
            options={priorityOptions}
            onChange={handlePriority}
            parameters={props.filteredTask[index].id}
          />
        </td>
        <td>
          <Input
            type="datetime-local"
            value={element.deadline || ""}
            onChange={handleDeadline}
            parameters={props.filteredTask[index].id}
          ></Input>
        </td>
        <td>
          <Select
            defaultValue={element.status == 1 ? "Completed" : "Pending"}
            options={statusOptions}
            onChange={handleStatus}
            parameters={props.filteredTask[index].id}
          />
        </td>
        <td className="delete-button">
          <Button
            onClick={handleDelete}
            parameters={tasks[index].id}
            value={"X"}
          ></Button>
        </td>
      </tr>
    );
  });

  const tableRowsLoading = [
    <tr key={"temp"}>
      <td>Loading</td>
    </tr>,
  ];

  const tableRender = () => {
    if (props.loading) {
      <p>Loading...</p>;
    } else {
      return (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>{tableRows}</tbody>
        </table>
      );
    }
  };

  return (
    <>
      <div className="container">
        <br />
        <input
          id="search-box"
          type="text"
          value={props.search}
          placeholder="Search Task"
          onChange={(e) => handleSearch(e)}
        ></input>
        <select
          id="priority-box"
          defaultValue="none"
          onChange={(event) => props.changePriority(event.target.value)}
        >
          <option>none</option>
          <option>urgent</option>
          <option>elective</option>
        </select>
        <h1>Your Daily Tasks</h1>
        {tableRender()}
      </div>
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    loading: loadSelector(state),
    tasks: taskSelector(state),
    search: searchSelector(state),
    filteredTask: fileteredTaskSelector(state),
    priority: prioritySelector(state),
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    fetchTask: () => dispatch(fetchTask()),
    updateTask: (id, task) => dispatch(updateTask(id, task)),
    removeTask: (id) => dispatch(removeTask(id)),
    changeSearch: (val) => dispatch(changeSearch(val)),
    changePriority: (val) => dispatch(changePriority(val)),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(List);
