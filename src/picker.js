import { colors, createElement, resetHtml, rgbToHex, valueToRgb } from './utils';

const arrowsSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="111" height="28" viewBox="0 0 111 28">
  <g>
    <polygon points="0 28 0 0 16 14 0 28" class="arrow"/>
    <polygon points="111 0 111 28 95 14 111 0" class="arrow"/>
  </g>
</svg>
`;

export const Picker = ({ containerId, store }) => {
	resetHtml(containerId);

	let value = 0;

	const container  = createElement('div', document.getElementById(containerId), { className: 'picker-container' });
	const slider     = createElement('div', container, { className: 'picker-slider', styles: { background: 'linear-gradient(to top' + colors.reduce((style, color) => ( `${style}, rgb(${color[0]}, ${color[1]}, ${color[2]})`), '') + ')' }});
	const arrows     = createElement('div', container, { className: 'picker-arrows' });
	const maxRange   = slider.offsetHeight;

	arrows.innerHTML = arrowsSVG;

	// Methods
	const render = () => {
		arrows.style.top = `${(1 - value) * 100}%`;
		const elements = arrows.getElementsByClassName('arrow');
		for (let i = 0; i < elements.length; i++) {
			elements[i].style.fill = store.get('color');
		}
	};
	const updateColorFromClientY = (clientY) => {
		const rect = slider.getBoundingClientRect();
		const mouseY = clientY - rect.top;
		value = 1 - mouseY / maxRange;

		const rgb = valueToRgb(value);
		store.dispatch('setColor', rgbToHex(rgb));

		render();
	};
	// Handlers
	const handleMouseDown = (evt) => {
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
