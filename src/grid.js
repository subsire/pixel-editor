import { createElement } from './utils';

export const Grid = ({ containerId, store }) => {
	const container = createElement('div', document.getElementById(containerId), null, 'grid-container');
	const containerBox = createElement('div', container, null, 'grid-container-box');
	const canvas = createElement('canvas', containerBox);

	const drawGrid = (size) => {

	};
	const render = () => {
		console.log("Grid > render()");
		// console.log(`Size: ${store.get('size')}`);

		// drawGrid(store.get('size'));
	};

	if (store && typeof store.subscribe === 'function') {
		store.subscribe('sizeChange', render);
	}

	return {
		render
	};
};
