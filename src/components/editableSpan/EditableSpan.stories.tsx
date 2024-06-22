import { EditableSpan } from './EditableSpan';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { action } from '@storybook/addon-actions';
import { ReduxStoreProviderDecorator } from '../../../.storybook/ReduxStoreProviderDecorator';
import { useState } from 'react';
import { StoryObj } from '@storybook/react';

export default {
	title: 'EditSpan',
	component: EditableSpan,
	parameters: {
		layout: 'centered',
	},
	decorators: [ReduxStoreProviderDecorator],
};

type Story = StoryObj<typeof EditableSpan>;
export const EditableSpanBaseExample: Story = {
	render: () => {
		const [text, setText] = useState('Test');
		return <EditableSpan editText={setText} status={2} title={text} />;
	},
};
