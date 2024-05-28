import { Task } from './Task';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';
import { StoryObj } from '@storybook/react';
import { ReduxStoreProviderDecorator } from '../../../.storybook/ReduxStoreProviderDecorator';
import { TaskStatuses } from '../../api/task-api';

export default {
	title: 'TaskExample',
	component: Task,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		title: { control: 'text' },
	},
	tags: ['autodocs'],
	decorators: [ReduxStoreProviderDecorator],
};

type Story = StoryObj<typeof Task>;

export const Example: Story = {
	args: {
		title: 'testTask',
		status: TaskStatuses.Completed,
		taskId: '2',
		todoId: '3',
	},
};
export const TaskNotIsDone = () => (
	<Provider store={store}>
		<Task
			title={'First story'}
			status={TaskStatuses.New}
			taskId={'1'}
			todoId={'1'}
		/>
	</Provider>
);

export const TaskIsDone = () => (
	<Provider store={store}>
		<Task
			title={'Second story'}
			status={TaskStatuses.Completed}
			taskId={'2'}
			todoId={'1'}
		/>
	</Provider>
);
