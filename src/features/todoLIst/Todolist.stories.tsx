import { TodoList } from './TodoList';
import { ReduxStoreProviderDecorator } from '../../../.storybook/ReduxStoreProviderDecorator';
import { StoryObj } from '@storybook/react';

export default {
	title: 'Todolist',
	component: TodoList,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [ReduxStoreProviderDecorator],
	args: {
		filter: 'All',
		title: 'Example',
		todoId: 'scsa',
	},
};

type Story = StoryObj<typeof TodoList>;

export const TodolistStory: Story = {};
