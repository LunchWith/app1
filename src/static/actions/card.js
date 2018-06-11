import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';

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


export function cardPost(
    contents,
    videoName,
    videoYn,
    imageFile,
    imageYn,
    meetDate,
    meetTime,
    deadlineDate,
    deadlineTime,
    location,
    lat,
    lng
) {
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
                    video_name: videoName,
                    video_yn: videoYn,
                    image_yn: imageYn,
                    meet_date: meetDate,
                    meet_time: meetTime,
                    deadline_date: deadlineDate,
                    deadline_time: deadlineTime,
                    location,
                    lat,
                    lng
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
        formData.append('video_name', videoName); // To be change 'undefined' → ''
        formData.append('video_yn', videoYn);
        formData.append('image_file', imageFile);
        formData.append('image_yn', imageYn);
        formData.append('meet_date', meetDate);
        formData.append('meet_time', meetTime);
        formData.append('deadline_date', deadlineDate);
        formData.append('deadline_time', deadlineTime);
        formData.append('location', location);
        formData.append('lat', lat);
        formData.append('lng', lng);

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
                const responseDataSet = camelizeKeys(response.data_set);

                const connectedDataSet = dataSet === undefined ?
                    responseDataSet
                    :
                    dataSet.concat(responseDataSet);

                dispatch(cardListSuccess(connectedDataSet));
            })
            .catch((error) => {
                dispatch(cardListFailure());
            });
    };
}


export function cardChangeRequest() {
    return {
        type: CARD_CHANGE_REQUEST
    };
}


export function cardChangeSuccess(dataSet) {
    return {
        type: CARD_CHANGE_SUCCESS,
        payload: {
            dataSet
        }
    };
}


export function cardChangeFailure() {
    return {
        type: CARD_CHANGE_FAILURE
    };
}


export function cardChange(dataSet, index) {
    return (dispatch) => {
        // inform CARD CHANGE API is starting
        dispatch(cardChangeRequest());

        const id = dataSet[index].id;
        return fetch(`${SERVER_URL}/api/v1/card/get/${id}/`, {
            headers: {
                Accept: 'application/json'
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                const responseDataSet = camelizeKeys(response.data_set[0]);

                const dataSetUpper = dataSet.slice(0, index);
                const dataSetMiddle = responseDataSet;
                const dataSetLower = dataSet.slice(index + 1, dataSet.length);

                const connectedDataSet =
                    dataSetUpper.concat(dataSetMiddle).concat(dataSetLower);

                dispatch(cardChangeSuccess(connectedDataSet));
            })
            .catch((error) => {
                dispatch(cardChangeFailure());
            });
    };
}
