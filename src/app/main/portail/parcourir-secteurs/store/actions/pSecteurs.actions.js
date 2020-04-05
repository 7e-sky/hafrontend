import agent from "agent";
import _ from '@lodash';

export const CLEAN_UP = '[SECTEURS PORTAIL APP] CLEAN_UP';
export const REQUEST_SECTEURS = '[SECTEURS PORTAIL APP] REQUEST_SECTEURS';
export const GET_SECTEURS = '[SECTEURS PORTAIL APP] GET_SECTEURS';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getPSecteurs() {
    const request = agent.get(`/api/parcourir_secteurs`);
    return (dispatch) => {
        dispatch({
            type: REQUEST_SECTEURS,
        });

        return request.then((response) => {

            dispatch({
                type: GET_SECTEURS,
                payload: response.data
            })

        }

        );
    }

}
