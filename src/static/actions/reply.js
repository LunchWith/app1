import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    REPLY_POST_REQUEST,
    REPLY_POST_SUCCESS,
    REPLY_POST_FAILURE,

    REPLY_LIST_REQUEST,
    REPLY_LIST_SUCCESS,
    REPLY_LIST_FAILURE,
} from '../constants';


export function replyPostRequest() {
    return {
        type: REPLY_POST_REQUEST
    };
}


export function replyPostSuccess() {
    return {
        type: REPLY_POST_SUCCESS
    };
}


export function replyPostFailure() {
    return {
        type: REPLY_POST_FAILURE
    };
}


export function replyPost(contents) {
    return (dispatch) => {
        // inform REPLY POST API is starting
        dispatch(replyPostRequest());
        const token = btoa(sessionStorage.getItem('token'));

        return fetch(`${SERVER_URL}/api/v1/reply/post/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                contents,
            }),
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(replyPostSuccess());
            })
            .catch((error) => {
                dispatch(replyPostFailure());
            });
    };
}
