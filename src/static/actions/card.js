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

    CARD_CHANGE_REQUEST,
    CARD_CHANGE_SUCCESS,
    CARD_CHANGE_FAILURE,
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


export function cardPost(contents, videoid, imageYN, imageFile) {
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
                    image_yn: imageYN,
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
        formData.append('videoid', videoid || ''); // To be change 'undefined' → ''
        formData.append('image_yn', imageYN);
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


export function cardList(dataSet) {
    return (dispatch) => {
        // inform CARD LIST API is starting
        dispatch(cardListRequest());

        let id = 0;
        if (dataSet !== undefined) {
            id = dataSet[dataSet.length - 1].id;
        }

        return fetch(`${SERVER_URL}/api/v1/card/list/${id}/`, {
            headers: {
                Accept: 'application/json'
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                const connectedDataSet = dataSet === undefined ?
                    response.dataSet
                    :
                    dataSet.concat(response.dataSet);

                dispatch(cardListSuccess(connectedDataSet));
            })
            .catch((error) => {
                dispatch(cardListFailure());
            });
    };
}
