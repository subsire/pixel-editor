export const createElement = (tag, parent = document.body, { id = null, className = null, styles = null, props = null } = {}) => {
	const element = document.createElement(tag);

	if (id) {
		element.setAttribute('id', id);
	}
	if (className) {
		if (Array.isArray(className)) {
			className.forEach((name) => {
				element.classList.add(name);
			});
		} else {
			className.split(' ').forEach((name) => {
				element.classList.add(name);
			});
		}
	}
	if (styles) {
		Object.entries(styles).forEach(([key, value]) => {
			element.style[key] = value;
		});
	}
	if (props) {
		Object.entries(props).forEach(([key, value]) => {
			element[key] = value;
		});
	}

	parent.appendChild(element);

	return element;
};

// Handling parcel refresh
export const resetHtml = (id) => {
	const element = document.getElementById(id);
	element.textContent = '';
};

// Colors!
export const colors = [
	[255, 0, 0],
	[255, 255, 0],
	[0, 255, 0],
	[0, 255, 255],
	[0, 0, 255],
	[255, 0, 255],
	[255, 0, 0],
];
export const valueToRgb = (value) => {
	const offset = (colors.length - 1) * value;
	const index  = Math.min(Math.floor(offset), colors.length - 2);

	const colorNext = colors[ index + 1 ];
	const colorCurr = colors[ index ];
	const colorFrac = offset - index;

	// Linear interpolation utility used to compute blend between current and next colour
	function mix(from, to, frac) {
		return parseInt((to - from) * frac + from);
	}

	return {
		red:   mix(colorCurr[0], colorNext[0], colorFrac),
		green: mix(colorCurr[1], colorNext[1], colorFrac),
		blue:  mix(colorCurr[2], colorNext[2], colorFrac),
	};
};
export const decimalToHex = (decimal) => {
	const hex = decimal.toString(16);
	return hex.length === 1 ? "0" + hex : hex;
};
export const hexToRgb = (hex) => {
	if (hex.indexOf('#') === 0) {
		hex = hex.slice(1);
	}
	// Convert 3-digit hex to 6-digits.
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	return {
		red:   parseInt(hex.slice(0, 2), 16),
		green: parseInt(hex.slice(2, 4), 16),
		blue:  parseInt(hex.slice(4, 6), 16),
	}
};
export const rgbToHex = (color) => {
	return "#" + decimalToHex(color.red) + decimalToHex(color.green) + decimalToHex(color.blue);
};
export const contrastingColor = (color) => {
	const rgb = hexToRgb(color);
	const yiq = ((rgb.red * 299) + (rgb.green * 587) + (rgb.blue * 114)) / 1000
	return (yiq >= 128) ? '#000' : '#fff'
};

// Grid and images methods
export const getGridMatrix = (size) => ( Array(parseInt(size)).fill().map(() => ( Array(parseInt(size)).fill() )) );
export const getCanvasFromGrid = (grid) => {
	// Creating virtual canvas
	const canvas  = document.createElement('canvas');
	canvas.width  = grid.length;
	canvas.height = grid.length;
	const context = canvas.getContext('2d');

	// Drawing
	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid.length; y++) {
			if (grid[x][y]) {
				context.fillStyle = grid[x][y];
				context.fillRect(x, y, 1, 1);
			}
		}
	}

	return canvas;
};
// export const canvasToPng = (canvas) => ( canvas.toDataURL('image/png') );
// export const pngToDownloadable = (png) => ( png.replace(/^data:image\/[^;]*/, 'data:application/octet-stream') );
