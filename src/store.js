const Store = (defaultState) => {
	let state = Object.assign({}, defaultState);
	const subscribers = [];

	const dispatch = (action, payload) => {
		let dispatcher = 'none';
		switch (action) {
			case 'setColor':
				/*
				state = {
					...state,
					color: payload,
				};
				*/
				state = Object.assign(state, { color: paylod });
				dispatcher = 'colorChange';
				break;
			case 'setSize':
				/*
				state = {
					...state,
					size: payload,
				};
				*/
				state = Object.assign(state, { size: payload });
				dispatcher = 'sizeChange';
				break;
			default:
				break;
		}

		if (dispatcher !== 'none') {
			subscribers
				.filter((subscriber) => ( subscriber.listener === dispatcher || subscriber.listener === 'all' ))
				.forEach((subscriber) => { console.log(subscriber.listener); subscriber.callback(); })
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
