import { FilterType } from 'features/todos/model/_tests_/todolistSlice';
import { TaskDomainType } from 'features/task/model/tasksSlice';
import { TaskStatuses } from 'common/enums/enums';

export function filterTasks(filter: FilterType, tasks: TaskDomainType[]) {
	if (filter === 'Completed') {
		return tasks.filter(task => task.status === TaskStatuses.Completed);
	}
	if (filter === 'Active') {
		return tasks.filter(task => task.status === TaskStatuses.New);
	}
	return tasks;
}
