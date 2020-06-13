export const createElement = (tag, parent = document.body, id = null, className = null, cssProp = {}) => {
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
			element.classList.add(className);
		}
	}
	Object.entries(cssProp).forEach(([key, value]) => {
		element.style[key] = value;
	});
	parent.appendChild(element);

	return element;
};

// To handle parcel refresh
export const resetHtml = (id) => {
	const element = document.getElementById(id);
	element.textContent = '';
}
