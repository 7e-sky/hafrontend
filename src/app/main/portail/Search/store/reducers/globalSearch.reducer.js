import * as Actions from '../actions';

const initialState = {
    searchText: '',
    suggestions: [],
    loading: false,
    opened: false,
    noSuggestions: false,
    actualites: [], // Ajout du state pour les actualités
    loadingActualites: false // Ajout du state pour le chargement des actualités
};

const globalSearchReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...state,
                    suggestions: [],
                    noSuggestions: false,
                    actualites: [] // Réinitialisation des actualités
                };
            }
        case Actions.REQUEST_DATA:
            {
                return {
                    ...state,
                    loading: true,
                    suggestions: [],
                    noSuggestions: false,
                    loadingActualites: true // Mise à jour du state de chargement
                };
            }
        case Actions.GET_DATA:
            {
                const suggestions = action.payload;
                const noSuggestions = suggestions.length === 0;
                return {
                    ...state,
                    suggestions,
                    noSuggestions,
                    loading: false,
                    loadingActualites: false
                };
            }
        case Actions.SET_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }
        case Actions.GS_OPEN:
            {
                return {
                    ...state,
                    opened: true,
                };
            }
        case Actions.GS_CLOSE:
            {
                return {
                    ...state,
                    opened: false,
                    searchText: '',
                    actualites: [] // Réinitialisation des actualités à la fermeture
                };
            }
        case Actions.CLEAR_SUGGESTIONS:
            {
                return {
                    ...state,
                    suggestions: [],
                    noSuggestions: false,
                    loading: false,
                    loadingActualites: false
                };
            }
        default:
            {
                return state;
            }
    }
};

export default globalSearchReducer;
