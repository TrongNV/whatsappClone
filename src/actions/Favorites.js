import types from './types';

export const search = (keyword) => {
    return (dispatch) => {
        dispatch({
            type: types.SEARCH,
            payload: keyword
        });
    };
};
