import agent from "agent";
import { showMessage } from 'app/store/actions/fuse';
import { FuseUtils } from '@fuse';
import _ from '@lodash';

export const CLEAN_UP = '[DETAIL FOURNISSEUR APP] CLEAN_UP';
export const REQUEST_FOURNISSEUR_PRODUITS_APERCU = '[DETAIL FOURNISSEUR APP] REQUEST_FOURNISSEUR_PRODUITS_APERCU';
export const REQUEST_FOURNISSEUR_PRODUITS = '[DETAIL FOURNISSEUR APP] REQUEST_FOURNISSEUR_PRODUITS';
export const REQUEST_FOURNISSEUR = '[DETAIL FOURNISSEUR APP] REQUEST_FOURNISSEUR';
export const GET_FOURNISSEUR = '[DETAIL FOURNISSEUR APP] GET_FOURNISSEUR';
export const GET_FOURNISSEUR_PRODUITS_APERCU = '[DETAIL FOURNISSEUR APP] GET_FOURNISSEUR_PRODUITS_APERCU';
export const GET_FOURNISSEUR_PRODUITS = '[DETAIL FOURNISSEUR APP] GET_FOURNISSEUR_PRODUITS';
export const SAVE_ERROR = '[DETAIL FOURNISSEUR APP] SAVE ERROR';
export const REQUEST_UPDATE_FOURNISSEUR = '[DETAIL FOURNISSEUR APP] REQUEST_UPDATE_FOURNISSEUR';
export const GET_UPDATE_FOURNISSEUR = '[DETAIL FOURNISSEUR APP] GET_UPDATE_FOURNISSEUR';
export const SET_PARAMETRES_DATA = '[DETAIL FOURNISSEUR APP] SET PARAMETRES DATA';
export const CLEAN_ERROR = '[DETAIL FOURNISSEUR APP] CLEAN_ERROR';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getFournisseur(id) {
    const request = agent.get(`/api/fournisseurs/${id}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_FOURNISSEUR,
        });
       
        return request.then((response) => {

            dispatch({
                type: GET_FOURNISSEUR,
                payload: response.data
            })

        }

        );
    }

}
export function getFournisseurProduitsApercu(id) {
    const request = agent.get(`/api/fournisseurs/${id}/produits?itemsPerPage=4&order[created]=desc`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_FOURNISSEUR_PRODUITS_APERCU,
        });
       
        return request.then((response) => {

            dispatch({
                type: GET_FOURNISSEUR_PRODUITS_APERCU,
                payload: response.data['hydra:member']
            })

        }

        );
    }

}
export function getFournisseurProduits(id, parametres) {
    let order = _.split(parametres.filter.id, '-');
    const request = agent.get(`/api/fournisseurs/${id}/produits?page=${parametres.page}&itemsPerPage=${parametres.itemsPerPage}&order[${order[0]}]=${order[1]}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_FOURNISSEUR_PRODUITS,
        });
       
        return request.then((response) => {

            dispatch({
                type: GET_FOURNISSEUR_PRODUITS,
                payload: response.data
            })

        }

        );
    }

}
export function updateVuPhoneProduit(id) {
    const request = agent.put(`/custom/update_produit/${id}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        return request.then((response) => {

            dispatch({
                type: GET_UPDATE_FOURNISSEUR,
                payload: response.data
            })

        }


        );
    }

}
export function setParametresData(parametres) {
    return {
        type: SET_PARAMETRES_DATA,
        parametres
    }
}