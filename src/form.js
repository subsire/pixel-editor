import { actionTypes } from './store';
import { createElement, contrastingColor, resetHtml } from './utils';

const sizeRange = {
	min: 1,
	max: 498,
};

export const Form = ({ containerId, store }) => {
	resetHtml(containerId);

	const colorContainer = createElement('div', document.getElementById(containerId));
	const sizeContainer  = createElement('div', document.getElementById(containerId));

	const colorInput  = createElement('input', colorContainer, { className: 'form-input form-input-color', props: { type: 'text', value: store.get('color').toUpperCase(), disabled: true }});
	const widthInput  = createElement('input', sizeContainer, { className: 'form-input spacer', props: { type: 'number', value: store.get('size'), min: sizeRange.min, max: sizeRange.max }});
	const heightInput = createElement('input', sizeContainer, { className: 'form-input', props: { type: 'number', value: store.get('size'), min: sizeRange.min, max: sizeRange.max }});

	// Methods
	const render = () => {
		const color = store.get('color');

		colorInput.value = color.toUpperCase();
		colorInput.style.backgroundColor = color;
		colorInput.style.color = contrastingColor(color);

		widthInput.value  = store.get('size');
		heightInput.value = store.get('size');
	};
	// Handlers
	const handleSizeChange = (evt) => {
		store.dispatch(actionTypes.UPDATE_SIZE, Math.max(sizeRange.min, Math.min(sizeRange.max, parseInt(evt.target.value))));
	};

	// Listeners
	store.subscribe(`${actionTypes.UPDATE_COLOR} ${actionTypes.UPDATE_SIZE}`, render);
	widthInput.addEventListener('change', handleSizeChange);
	heightInput.addEventListener('change', handleSizeChange);


	return {
		render
	};
};
