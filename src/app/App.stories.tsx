import { StoryObj } from '@storybook/react';
import App from './App';
import { ReduxStoreProviderDecorator } from '../../.storybook/ReduxStoreProviderDecorator';

export default {
	title: 'App',
	component: App,
	// parameters: {
	// 	layout: 'centered',
	// },
	tags: ['autodocs'],
	decorators: [ReduxStoreProviderDecorator],
	args: {
		filter: 'All',
		title: 'Example',
		todoId: 'scsa',
	},
};

type Story = StoryObj<typeof App>;

export const AppStory: Story = {};
