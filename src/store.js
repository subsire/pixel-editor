const Store = (defaultState) => {
	let state = Object.assign({}, defaultState);
	const subscribers = [];

	const dispatch = (action, payload) => {
		let dispatcher = 'none';
		switch (action) {
			case 'setColor':
				/* Parcel doesn't like spread operator... ??
				state = {
					...state,
					color: payload,
				};
				*/
				state = Object.assign(state, { color: payload });
				dispatcher = 'colorChange';
				break;
			case 'setSize':
				state = Object.assign(state, { size: payload });
				dispatcher = 'sizeChange';
				break;
			default:
				break;
		}

		if (dispatcher !== 'none') {
			subscribers
				.filter((subscriber) => ( subscriber.listener.includes(dispatcher) || subscriber.listener === 'all' ))
				.forEach((subscriber) => { subscriber.callback(); })
		}
	};
	const get = (value) => {
		if (state.hasOwnProperty(value)) {
			return state[value];
		}
		return null;
	};
	const subscribe = (listener, callback) => {
		subscribers.push({ listener, callback })
	};

	return {
		dispatch,
		get,
		subscribe,
	};
};

export const createStore = (defaultState) => { return new Store(defaultState); };
