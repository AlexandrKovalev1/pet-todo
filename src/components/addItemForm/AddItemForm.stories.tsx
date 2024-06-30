import { AddItemForm } from './AddItemForm';
import { action } from '@storybook/addon-actions';

export default {
	title: 'AddItemForm',
	component: AddItemForm,
	parameters: {
		layout: 'centered',
	},
};

let callback = action('text');
export const AddItemFormBaseExample = () => <AddItemForm onClickFoo={callback} />;
