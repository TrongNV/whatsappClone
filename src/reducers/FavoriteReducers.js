import types from '../actions/types';
import data from './data.json';

export default (state = data, action) => {
    switch (action.type) {
        case types.SEARCH: {
            // const dt = state.find(action.payload);
            return state;
        }
        default:
            return state;
    }
};
