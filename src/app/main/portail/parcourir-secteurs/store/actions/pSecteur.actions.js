import agent from "agent";
import _ from '@lodash';

export const CLEAN_UP = '[ACTIVITES PORTAIL APP] CLEAN_UP';
export const REQUEST_ACTIVITES = '[ACTIVITES PORTAIL APP] REQUEST_ACTIVITES';
export const GET_ACTIVITES = '[ACTIVITES PORTAIL APP] GET_ACTIVITES';

export const REQUEST_FOURNISEEURS = '[ACTIVITES PORTAIL APP] REQUEST_FOURNISEEURS';
export const GET_FOURNISEEURS = '[ACTIVITES PORTAIL APP] GET_FOURNISEEURS';


export const REQUEST_SECTEUR = '[ACTIVITES PORTAIL APP] REQUEST_SECTEUR';
export const GET_SECTEUR = '[ACTIVITES PORTAIL APP] GET_SECTEUR';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}
export function getSecteur(id) {
    const request = agent.get(`/api/secteurs/${id}?props[]=id&props[]=name&props[]=slug`);
    return (dispatch) => {
        dispatch({
            type: REQUEST_SECTEUR,
        });

        return request.then((response) => {

            dispatch({
                type: GET_SECTEUR,
                payload: response.data
            })

        }

        );
    }

}
export function getPActivites(id) {
    const request = agent.get(`/api/secteurs/${id}/sous_secteurs?parent[exists]=false&pagination=false&props[]=id&props[]=name&props[]=slug`);
    return (dispatch) => {
        dispatch({
            type: REQUEST_ACTIVITES,
        });

        return request.then((response) => {

            dispatch({
                type: GET_ACTIVITES,
                payload: response.data['hydra:member']
            })

        }

        );
    }

}

export function getTopFounrisseurs(slug) {
    const request = agent.get(`/api/fournisseurs?sousSecteurs.secteur.slug=${slug}&itemsPerPage=5&order[visite]=desc&props[]=societe&props[]=slug&props[]=avatar&props[]=pays&props[]=id`);
    return (dispatch) => {
        dispatch({
            type: REQUEST_FOURNISEEURS,
        });

        return request.then((response) => {

            dispatch({
                type: GET_FOURNISEEURS,
                payload: response.data['hydra:member']
            })

        }

        );
    }

}
