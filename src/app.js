import { createStore } from './store';

import { Download } from './download';
import { Form } from './form';
import { Grid } from './grid';
import { Picker } from './picker';

const defaultState = {
	color: '#ff0000',
	size: 16,
};

export const App = () => {
	const store = createStore(defaultState);

	const download = new Download({ containerId: 'download', store });
	const form     = new Form({ containerId: 'form', store });
	const grid     = new Grid({ containerId: 'grid', store });
	const picker   = new Picker({ containerId: 'picker', store });

	// Initial render
	download.render();
	form.render();
	grid.render();
	picker.render();
};
