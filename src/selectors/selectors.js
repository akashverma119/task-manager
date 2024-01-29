import { createElement } from 'react';
import { createSelector } from 'reselect'

export const taskSelector = (state) => state.tasks;

// export const fileteredTaskSelector = (state) =>
// {
//   return state.tasks.filter((task)=>{
// 		return task.title.includes(state.search)
// 	});
// }

export const fileteredTaskSelector = createSelector(
  (state) => state.tasks,
  (state) => state.search,
  (tasks,search) => {
    return tasks.filter((task)=>{
      		return task.title.includes(search)
      	});
  }
)