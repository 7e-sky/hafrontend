import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    searchText: '',
    suggestions:[],
    loading: false,
    opened: false,
    noSuggestions: false


};

const globalSearchReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.CLEAN_UP:
            {
                return {
                    ...state,
                    suggestions: [],
                    noSuggestions: false
                };
            }
        case Actions.REQUEST_DATA:
            {
                return {
                    ...state,
                    loading: true,
                    suggestions: [],
                    noSuggestions: false

                };
            }
        case Actions.GET_DATA:
            {
                const suggestions = action.payload['hydra:member'];
                const noSuggestions = suggestions.length === 0;
                return {
                    ...state,
                    suggestions,
                    noSuggestions,
                    loading: false
                };
            }
        case Actions.SF_SET_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }
        case Actions.SF_OPEN:
            {
                return {
                    ...state,
                    opened: true,
                };
            }
        case Actions.SF_CLOSE:
            {
                return {
                    ...state,
                    opened: false,
                    searchText: '',
                };
            }
        default:
            {
                return state;
            }
    }
};

export default globalSearchReducer;
