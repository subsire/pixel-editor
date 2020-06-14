import { createElement, getCanvasFromGrid, resetHtml } from './utils';

const iconSVG = `
<svg class="svg-icon" viewBox="0 0 20 20">
	<path d="M9.634,10.633c0.116,0.113,0.265,0.168,0.414,0.168c0.153,0,0.308-0.06,0.422-0.177l4.015-4.111c0.229-0.235,0.225-0.608-0.009-0.836c-0.232-0.229-0.606-0.222-0.836,0.009l-3.604,3.689L6.35,5.772C6.115,5.543,5.744,5.55,5.514,5.781C5.285,6.015,5.29,6.39,5.522,6.617L9.634,10.633z"></path>
	<path d="M17.737,9.815c-0.327,0-0.592,0.265-0.592,0.591v2.903H2.855v-2.903c0-0.327-0.264-0.591-0.591-0.591c-0.327,0-0.591,0.265-0.591,0.591V13.9c0,0.328,0.264,0.592,0.591,0.592h15.473c0.327,0,0.591-0.264,0.591-0.592v-3.494C18.328,10.08,18.064,9.815,17.737,9.815z"></path>
</svg>
`;

export const Download = ({ containerId, store }) => {
	resetHtml(containerId);

	// const button = createElement('a', document.getElementById(containerId), { className: 'download-button', props: { href: '', download: 'pixel-art.png' } });
	const container  = createElement('div', document.getElementById(containerId));
	const button     = createElement('button', container, { className: 'download-button' });
	button.innerHTML = iconSVG + '<span>Download</span>';

	// Methods
	const downloadBlob = (blob) => {
		if (typeof window.navigator.msSaveBlob === 'function') {
			// IE workaround
			window.navigator.msSaveBlob(blob, 'pixel-art.png');
		} else {
			const url = (window.URL || window.webkitURL).createObjectURL(blob);
			// Create invisible element
			const downloadLink = createElement('a', container, { props: { href: url, download: 'pixel-art.png' }, styles: { display: 'none' } });
			// Trigger click
			downloadLink.click();
			// Remove element
			downloadLink.remove();
		}
	};
	const render = () => {
		// Do nothing...
	};
	// handlers
	const handleClick = (evt) => {
		evt.preventDefault();

		const canvas = getCanvasFromGrid(store.get('grid'));

		if (typeof canvas.toBlob === 'function') {
			canvas.toBlob(downloadBlob);
		} else {
			// Is Explorer?
			if (typeof canvas.msToBlob === 'function') {
				downloadBlob(canvas.msToBlob());
			} else {
				// Creating a blob by myself
				var image = canvas.toDataURL();
				image = image.replace(/^data:[a-z]*;,/, '');

				// Convert from base64 to an ArrayBuffer
				var byteString = atob(image);
				var buffer = new ArrayBuffer(byteString.length);
				var intArray = new Uint8Array(buffer);
				for (var i = 0; i < byteString.length; i++) {
				    intArray[i] = byteString.charCodeAt(i);
				}

				// Use the native blob constructor
				downloadBlob(new Blob([buffer], { type: "image/png" }));
			}
		}
	};

	button.addEventListener('click', handleClick);

	return {
		render
	};
};
