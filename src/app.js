// import { store } from './src/store';

import { Form } from './form';
import { Grid } from './grid';
import { Picker } from './picker';


export const App = () => {

	const form = new Form({ containerId: 'form' });
	const grid = new Grid({ containerId: 'grid' });
	const picker = new Picker({ containerId: 'picker' });

	// Initial render
	form.render();
	grid.render();
	picker.render();
};
