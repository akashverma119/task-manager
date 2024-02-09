import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Detail.css";
import { connect } from "react-redux";
import { updateTask } from "../../redux";
import { taskSelector } from "../../selectors/selectors";
import Input from "../atoms/Input";
import Select from "../atoms/Select";

const Detail = ({ stateTasks, updateTask }) => {
  const index = useParams()?.id;
  const tasks = stateTasks;
  const [task, setTask] = useState(tasks.find((obj) => obj.id == index));
  // console.log(task);
  const navigate = useNavigate();
  const handleEdit = (event) => {
    event.preventDefault();
    // console.log("index*******", index);
    // console.log("task*******", task);
    updateTask(index, task);
    navigate("../");
  };
  const handleTitle = (event) => {
    setTask({ ...task, title: event.target.value });
  };
  const handleDetail = (event) => {
    setTask({ ...task, detail: event.target.value });
  };
  const handleDeadline = (event) => {
    setTask({ ...task, deadline: event.target.value });
  };
  const handlePriority = (event, parameters = null) => {
    setTask({ ...task, priority: event.target.value });
  };
  const handleStatus = (event, parameters = null) => {
    setTask({ ...task, status: event.target.value === "Completed" ? 1 : 0 });
  };
  const priorityOptions = ["urgent", "elective"];
  const statusOptions = ["Pending", "Completed"];

  const formRender = () => {
    return (
      <form onSubmit={(e) => handleEdit(e)}>
        <label>
          Status:
          <Select
            defaultValue={task.status == 1 ? "Completed" : "Pending"}
            options={statusOptions}
            onChange={handleStatus}
          />
        </label>
        <label>
          Title:
          <Input
            type="text"
            value={task.title || ""}
            onChange={handleTitle}
          ></Input>
        </label>
        <label>
          Detail:
          <Input
            type="text"
            value={task.detail || ""}
            onChange={handleDetail}
          />
        </label>
        <label>
          Priority:
          <Select
            defaultValue={task.priority}
            options={priorityOptions}
            onChange={handlePriority}
          />
        </label>
        <label>
          Deadline:
          <Input
            type="datetime-local"
            value={task.deadline || ""}
            onChange={handleDeadline}
          ></Input>
        </label>
        <Input type="submit" value="EDIT" />
      </form>
    );
  };

  return (
    <>
      <div className="createDetailForm">{formRender()}</div>
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    stateTasks: taskSelector(state),
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    updateTask: (id, task) => dispatch(updateTask(id, task)),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Detail);
