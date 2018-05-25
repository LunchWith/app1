import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
import {
    CARD_POST_SAMPLE_REQUEST,
} from '../constants';


export function cardPostSampleRequest() {
    return {
        type: CARD_POST_SAMPLE_REQUEST
    };
}


export function cardPostSample(props) {
    return (dispatch) => {
        dispatch(cardPostSampleRequest());

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
                // return {
                //     type: CARD_POST_SAMPLE_REQUEST,
                //     payload: response
                // };
            });
    };
}
