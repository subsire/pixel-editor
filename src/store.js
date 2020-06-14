import { getGridMatrix } from './utils';

export const defaultState = {
	color: 0.5,
	grid:  getGridMatrix(16),
	size:  16,
};

export const actionTypes = {
	ALL:          'all',
	UPDATE_COLOR: 'updateColor',
	UPDATE_GRID:  'updateGrid',
	UPDATE_SIZE:  'updateSize',
};

const Store = (defaultState) => {
	let state = Object.assign({}, defaultState);
	const subscribers = [];

	const dispatch = (action, payload) => {
		switch (action) {
			case actionTypes.UPDATE_COLOR:
				/* Parcel doesn't like spread operator... ??
				state = {
					...state,
					color: payload,
				};
				*/
				state = Object.assign(state, { color: payload });
				break;
			case actionTypes.UPDATE_GRID:
				const { grid } = state;
				const { color, x, y } = payload;
				grid[x][y] = color;
				state = Object.assign(state, { grid });
				break;
			case actionTypes.UPDATE_SIZE:
				state = Object.assign(state, {
					size: payload,
					grid: getGridMatrix(payload),
				 });
				break;
			default:
				break;
		}

		if (action) {
			subscribers
				.filter((subscriber) => ( subscriber.listener.includes(action) || subscriber.listener === actionTypes.ALL ))
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

export const createStore = (initialState) => { return new Store(initialState); };
