import { createElement, contrastingColor, resetHtml } from './utils';

export const Form = ({ containerId, store }) => {
	resetHtml(containerId);

	const colorContainer = createElement('div', document.getElementById(containerId));
	const sizeContainer  = createElement('div', document.getElementById(containerId));

	const colorInput  = createElement('input', colorContainer, { className: 'form-input form-input-color', props: { type: 'text', value: store.get('color').toUpperCase(), disabled: true }});
	const widthInput  = createElement('input', sizeContainer, { className: 'form-input', props: { type: 'number', value: store.get('size') }});
	const heightInput = createElement('input', sizeContainer, { className: 'form-input', props: { type: 'number', value: store.get('size') }});

	// Methods
	const render = () => {
		colorInput.value = store.get('color').toUpperCase();
		colorInput.style.backgroundColor = store.get('color');
		colorInput.style.color = contrastingColor(store.get('color'));

		widthInput.value  = store.get('size');
		heightInput.value = store.get('size');
	};
	// Handlers
	const handleColorChange = (evt) => {
		store.dispatch('setColor', evt.target.value);
	};
	const handleSizeChange = (evt) => {
		store.dispatch('setSize', evt.target.value);
	};

	// Listeners
	store.subscribe('sizeChange colorChange', render);
	// colorInput.addEventListener('change', handleColorChange);
	widthInput.addEventListener('change', handleSizeChange);
	heightInput.addEventListener('change', handleSizeChange);


	return {
		render
	};
};
