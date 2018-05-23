import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    CARD_POST_REQUEST,
    CARD_POST_SUCCESS,
    CARD_POST_FAILURE,

    CARD_LIST_REQUEST,
    CARD_LIST_SUCCESS,
    CARD_LIST_FAILURE,
} from '../constants';


export function cardPostRequest() {
    return {
        type: CARD_POST_REQUEST
    };
}


export function cardPostSuccess() {
    return {
        type: CARD_POST_SUCCESS
    };
}


export function cardPostFailure() {
    return {
        type: CARD_POST_FAILURE
    };
}


export function cardPost(contents, videoid, imageFile) {
    return (dispatch) => {
        // inform CARD POST API is starting
        dispatch(cardPostRequest());
        const token = btoa(sessionStorage.getItem('token'));

        if (imageFile === null) {
            return fetch(`${SERVER_URL}/api/v1/card/post/`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    contents,
                    videoid,
                }),
            })
                .then(checkHttpStatus)
                .then(parseJSON)
                .then((response) => {
                    dispatch(cardPostSuccess());
                })
                .catch((error) => {
                    dispatch(cardPostFailure());
                });
        }

        const formData = new FormData();
        formData.append('contents', contents);
        formData.append('videoid', videoid);
        formData.append('imageFile', imageFile);

        const header = {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}`,
        };

        delete header['Content-Type']; // For auto-create boundary of Content-Type

        return fetch(`${SERVER_URL}/api/v1/card/post/`, {
            method: 'post',
            headers: header,
            body: formData
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(cardPostSuccess());
            })
            .catch((error) => {
                dispatch(cardPostFailure());
            });
    };
}


export function cardListRequest() {
    return {
        type: CARD_LIST_REQUEST
    };
}


export function cardListSuccess(dataSet) {
    return {
        type: CARD_LIST_SUCCESS,
        payload: {
            dataSet
        }
    };
}


export function cardListFailure() {
    return {
        type: CARD_LIST_FAILURE
    };
}


export function cardList() {
    return (dispatch) => {
        // inform CARD LIST API is starting
        dispatch(cardListRequest());

        return fetch(`${SERVER_URL}/api/v1/card/list/`, {
            headers: {
                Accept: 'application/json'
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(cardListSuccess(response.dataSet));
            })
            .catch((error) => {
                dispatch(cardListFailure());
            });
    };
}