import { createElement } from "react";
import { createSelector } from "reselect";

export const taskSelector = (state) => state.get("tasks");
export const loadSelector = (state) => state.get("loading");
export const searchSelector = (state) => state.get("search");
export const prioritySelector = (state) => state.get("priority");
export const errorSelector = (state) => state.get("error");

export const fileteredTaskSelector = createSelector(
  (state) => taskSelector(state),
  (state) => state.get("search"),
  (state) => state.get("priority"),
  (tasks, search, priority) => {
    return tasks.filter((task) => {
      return (
        (search == "" || task.title.includes(search)) &&
        (priority == "none" || task.priority == priority)
      );
    });
  }
);
