import { actionTypes } from './store';
import { createElement, resetHtml } from './utils';

export const Grid = ({ containerId, store }) => {
	resetHtml(containerId);

	const container = createElement('div', document.getElementById(containerId), { className: 'grid-container' });
	const containerBox = createElement('div', container, { className: 'grid-container-box' });
	const canvas = createElement('canvas', containerBox);
	const canvasWidth = containerBox.offsetWidth;
	const context = canvas.getContext('2d');

	context.canvas.width  = canvasWidth;
	context.canvas.height = canvasWidth;

	// Methods
	const drawGrid = (size) => {
		context.clearRect(0, 0, canvasWidth, canvasWidth);

		const step = canvasWidth / size;

		context.beginPath();
		context.strokeStyle = '#e0e0e0';

		for (let x = 0; x < canvasWidth + 1; x += step) {
	 		context.moveTo(x, 0);
	 		context.lineTo(x, canvasWidth);
		}

		for (let y = 0; y < canvasWidth + 1; y += step) {
			context.moveTo(0, y);
			context.lineTo(canvasWidth, y);
		}

		context.stroke();
	};
	const paint = (x, y, color = '#ffffff') => {
		const size = store.get('size');
		const step = canvasWidth / size;

		context.fillStyle = color;
    	context.fillRect(x * step, y * step, step, step);

		store.dispatch(actionTypes.UPDATE_GRID, { x, y, color });
	};
	const render = () => {

		drawGrid(store.get('size'));
	};

	// Handlers
	const handleClick = (evt) => {
		const rect   = canvas.getBoundingClientRect();
		const mouseX = evt.clientX - rect.left;
		const mouseY = evt.clientY - rect.top;

		const size  = store.get('size');
		const color = store.get('color');

		const x = Math.floor(mouseX / canvasWidth * size);
		const y = Math.floor(mouseY / canvasWidth * size);

		paint(x, y, color);
	};

	// Listeners
	store.subscribe(actionTypes.UPDATE_SIZE, render);
	canvas.addEventListener('click', handleClick);

	return {
		render
	};
};
