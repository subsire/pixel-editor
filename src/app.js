import { createStore } from './store';

import { Form } from './form';
import { Grid } from './grid';
import { Picker } from './picker';

const defaultState = {
	color: '#000000',
	size: 16,
};

export const App = () => {
	const store = createStore(defaultState);

	const form = new Form({ containerId: 'form' });
	const grid = new Grid({ containerId: 'grid', store });
	const picker = new Picker({ containerId: 'picker' });

	// Initial render
	form.render();
	grid.render();
	picker.render();
};
