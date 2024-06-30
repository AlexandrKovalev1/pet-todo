import { FilterType } from 'bll/todolistSlice';
import { TaskDomainType } from 'bll/tasksSlice';
import { TaskStatuses } from '../api/task-api';

export function filterTasks(filter: FilterType, tasks: TaskDomainType[]) {
	if (filter === 'Completed') {
		return tasks.filter(task => task.status === TaskStatuses.Completed);
	}
	if (filter === 'Active') {
		return tasks.filter(task => task.status === TaskStatuses.New);
	}
	return tasks;
}
