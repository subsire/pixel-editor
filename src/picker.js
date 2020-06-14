import { actionTypes } from './store';
import { colors, createElement, resetHtml, valueToHex } from './utils';

const arrowsSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="111" height="28" viewBox="0 0 111 28">
    <polygon points="0 28 0 0 16 14 0 28" class="arrow"/>
    <polygon points="111 0 111 28 95 14 111 0" class="arrow"/>
</svg>
`;

export const Picker = ({ containerId, store }) => {
	resetHtml(containerId);

	const container  = createElement('div', document.getElementById(containerId), { className: 'picker-container' });
	const slider     = createElement('div', container, { className: 'picker-slider', styles: { background: 'linear-gradient(to top' + colors.reduce((style, color) => ( `${style}, rgb(${color[0]}, ${color[1]}, ${color[2]})`), '') + ')' }});
	const arrows     = createElement('div', container, { className: 'picker-arrows' });
	const maxRange   = slider.offsetHeight;

	arrows.innerHTML = arrowsSVG;

	// Methods
	const render = () => {
		const color = store.get('color');
		const hexColor = valueToHex(color);

		arrows.style.top = `${(1 - color) * 100}%`;
		Array.from(arrows.getElementsByClassName('arrow')).forEach((element) => {
			element.style.fill = hexColor;
		});
	};
	const updateColorFromClientY = (clientY) => {
		const rect = slider.getBoundingClientRect();
		const mouseY = clientY - rect.top;

		store.dispatch(actionTypes.UPDATE_COLOR, Math.max(0, Math.min(1 - mouseY / maxRange, 1)));
		render();
	};
	// Handlers
	const handleMouseDown = (evt) => {
		container.addEventListener('mousemove', handleMouseMove);
		container.addEventListener('mouseout', handleMouseUp);
		document.addEventListener('mouseup', handleMouseUp);

		updateColorFromClientY(evt.clientY);
	};
	const handleMouseMove = (evt) => {
		updateColorFromClientY(evt.clientY);
	};
	const handleMouseUp = (evt) => {
		container.removeEventListener('mousemove', handleMouseMove);
		container.removeEventListener('mouseout', handleMouseUp);
		document.removeEventListener('mouseup', handleMouseUp);

		updateColorFromClientY(evt.clientY);
	};

	// Listeners
	container.addEventListener('mousedown', handleMouseDown);

	return {
		render
	};
};
