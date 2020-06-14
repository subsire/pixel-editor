import { colors, createElement, resetHtml, rgbToHex, valueToRgb } from './utils';

export const Picker = ({ containerId, store }) => {
	resetHtml(containerId);

	// linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)
	const container  = createElement('div', document.getElementById(containerId), { className: 'picker-container' });
	const slider     = createElement('div', container, { className: 'picker-slider', styles: { background: 'linear-gradient(to top' + colors.reduce((style, color) => ( `${style}, rgb(${color[0]}, ${color[1]}, ${color[2]})`), '') + ')' }});
	const maxRange   = slider.offsetHeight;

	// Methods
	const render = () => {
		// Do nothing...
	};
	const updateColorFromClientY = (clientY) => {
		const rect = slider.getBoundingClientRect();
		const mouseY = clientY - rect.top;
		const value = 1 - mouseY / maxRange;

		const rgb = valueToRgb(value);
		store.dispatch('setColor', rgbToHex(rgb));
	};
	// Handlers
	const handleMouseDown = (evt) => {
		// evt.preventDefault();

		container.addEventListener('mousemove', handleMouseMove);
		container.addEventListener('mouseup', handleMouseUp);
		container.addEventListener('mouseout', handleMouseUp);

		updateColorFromClientY(evt.clientY);
	};
	const handleMouseMove = (evt) => {
		updateColorFromClientY(evt.clientY);
	};
	const handleMouseUp = (evt) => {
		container.removeEventListener('mousemove', handleMouseMove);
		container.removeEventListener('mouseup', handleMouseUp);
		container.removeEventListener('mouseout', handleMouseUp);

		updateColorFromClientY(evt.clientY);
	};


	// Listeners
	container.addEventListener('mousedown', handleMouseDown);

	return {
		render
	};
};
