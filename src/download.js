import { createElement, getCanvasFromGrid, resetHtml } from './utils';

const iconSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <path d="M14.48,8.74a.6.6,0,0,0-.84,0l-3.05,3.12V3.18h0V3A.59.59,0,1,0,9.41,3v.66h0v8.14l-3.06-3a.59.59,0,1,0-.83.84l4.11,4a.63.63,0,0,0,.42.17.58.58,0,0,0,.42-.18l4-4.11A.6.6,0,0,0,14.48,8.74Z" style="fill: #fff"/>
    <path d="M17.74,8.57a.6.6,0,0,0-.6.59v7.21H2.85V14.56h0V9.16a.6.6,0,0,0-1.19,0V17a.6.6,0,0,0,.59.6H17.74a.6.6,0,0,0,.59-.6V9.16A.6.6,0,0,0,17.74,8.57Z" style="fill: #fff"/>
</svg>
`;

export const Download = ({ containerId, store }) => {
	resetHtml(containerId);

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
				// Creating a blob by myself...
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
