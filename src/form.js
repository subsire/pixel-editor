import { actionTypes } from './store';
import { createElement, contrastingColor, resetHtml, valueToHex } from './utils';

const sizeRange = {
	min: 1,
	max: 498,
};
const xSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="42" height="45" viewBox="0 0 42 45">
  <polygon points="29.48 15.43 28.07 14.02 21 21.09 13.93 14.02 12.52 15.43 19.59 22.5 12.52 29.57 13.93 30.98 21 23.91 28.07 30.98 29.48 29.57 22.41 22.5 29.48 15.43" style="fill: #d8d8d8"/>
</svg>
`;

export const Form = ({ containerId, store }) => {
	resetHtml(containerId);

	const colorContainer = createElement('div', document.getElementById(containerId));
	const sizeContainer  = createElement('div', document.getElementById(containerId), { className: 'flex-container' });

	const colorInput  = createElement('input', colorContainer, { className: 'form-input form-input-color', props: { type: 'text', disabled: true }});
	const widthInput  = createElement('input', sizeContainer, { className: 'form-input spacer', props: { type: 'number', value: store.get('size'), min: sizeRange.min, max: sizeRange.max }});
	const xIcon       = createElement('div', sizeContainer, { className: 'form-input-space-x' });
	const heightInput = createElement('input', sizeContainer, { className: 'form-input', props: { type: 'number', value: store.get('size'), min: sizeRange.min, max: sizeRange.max }});

	xIcon.innerHTML = xSVG;

	// Methods
	const render = () => {
		const color = valueToHex(store.get('color'));

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
