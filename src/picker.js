import { colors, createElement, resetHtml, rgbToHex, valueToRgb } from './utils';

export const Picker = ({ containerId, store }) => {
	resetHtml(containerId);

	// linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)
	const container = createElement('div', document.getElementById(containerId), { className: 'picker-container' });
	const slider = createElement('div', container, { className: 'picker-slider', styles: { background: 'linear-gradient(to top' + colors.reduce((style, color) => ( `${style}, rgb(${color[0]}, ${color[1]}, ${color[2]})`), '') + ')' }});
	const maxRange = slider.offsetHeight;

	// Methods
	const render = () => {
		// Do nothing...
	};
	// Handlers
	const handleClick = (evt) => {
		evt.preventDefault();

		const rect = slider.getBoundingClientRect();
		const mouseY = evt.clientY - rect.top;
		const value = mouseY / maxRange;

		const rgb = valueToRgb(value); // NOT the right color...
		store.dispatch('setColor', rgbToHex(rgb));
	};


	// Listeners
	slider.addEventListener('click', handleClick);

	return {
		render
	};
};
