import { createElement } from 'react';
import { createSelector } from 'reselect'

export const taskSelector = (state) => state.get("tasks");


export const fileteredTaskSelector = createSelector(
  (state) => taskSelector(state),
  (state) => state.get("search"),
  (state) => state.get("priority"),
  (tasks,search,priority) => {
    return tasks.filter((task)=>{
      		return task.title.includes(search) && (priority=="none" || task.priority==priority)
      	});
  }
)
