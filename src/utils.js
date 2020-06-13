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

// To handle parcel refresh
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
		red:   mix(colorCurr[0], colorNext[1], colorFrac),
		green: mix(colorCurr[1], colorNext[1], colorFrac),
		blue:  mix(colorCurr[2], colorNext[2], colorFrac),
	};
};
const componentToHex = (component) => {
	const hex = component.toString(16);
	return hex.length === 1 ? "0" + hex : hex;
};
export const rgbToHex = (color) => {
	return "#" + componentToHex(color.red) + componentToHex(color.green) + componentToHex(color.blue);
};
