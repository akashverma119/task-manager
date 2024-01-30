import { createElement } from 'react';
import { createSelector } from 'reselect'

export const taskSelector = (state) => state.tasks;


export const fileteredTaskSelector = createSelector(
  (state) => taskSelector(state),
  (state) => state.search,
  (tasks,search) => {
    return tasks.filter((task)=>{
      		return task.title.includes(search)
      	});
  }
)
