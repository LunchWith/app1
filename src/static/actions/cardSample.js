import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';

// import {
//     CARD_POST_REQUEST,
//     CARD_POST_SUCCESS,
//     CARD_POST_FAILURE,

//     CARD_LIST_REQUEST,
//     CARD_LIST_SUCCESS,
//     CARD_LIST_FAILURE,
// } from '../constants';
export const CARD_POST_SAMPLE_REQUEST = 'CARD_POST_SAMPLE_REQUEST';

export function cardPostSample(props) {
    return fetch(`${SERVER_URL}/api/v1/card/postSample/`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            props
        }),
    })
        .then((response) => {
            return {
                type: CARD_POST_SAMPLE_REQUEST,
                payload: response
            };
        });
}
