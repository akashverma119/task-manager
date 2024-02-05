import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Detail.css";
import { connect } from "react-redux";
import { updateTask } from "../../redux";
import { taskSelector } from "../../selectors/selectors";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
const Detail = (props) => {
  const index = useParams()?.id;
  const tasks = props.tasks;
  const [task, setTask] = useState(tasks.find((obj) => obj.id == index));
  const navigate = useNavigate();
  const handleEdit = (event) => {
    event.preventDefault();
    props.updateTask(index, task);
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
  const handlePriority = (event) => {
    setTask({ ...task, priority: event.target.value });
  };
  const handleStatus = (event) => {
    setTask({ ...task, status: event.target.value === "Completed" ? 1 : 0 });
  };
  const priorityOptions = ["urgent", "elective"];
  const statusOptions = ["Pending", "Completed"];

  const formRender = () => {
    return (
      <form>
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
        <Button onClick={(e) => handleEdit(e)} value={"EDIT"}></Button>
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
    tasks: taskSelector(state),
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    updateTask: (id, task) => dispatch(updateTask(id, task)),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Detail);
