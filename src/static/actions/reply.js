import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';

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


export function replyPost(cardId, bidPrice, contents) {
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
                card: cardId,
                bid_price: bidPrice,
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


export function replyListRequest() {
    return {
        type: REPLY_LIST_REQUEST
    };
}


export function replyListSuccess(dataSet, nextBidder, startPage) {
    return {
        type: REPLY_LIST_SUCCESS,
        payload: {
            dataSet,
            nextBidder,
            startPage,
        }
    };
}


export function replyListFailure() {
    return {
        type: REPLY_LIST_FAILURE
    };
}


export function replyList(dataSet, cardId, startPage) {
    return (dispatch) => {
        // inform REPLY LIST API is starting
        dispatch(replyListRequest());

        return fetch(`${SERVER_URL}/api/v1/reply/list/${cardId}/${startPage}/`, {
            headers: {
                Accept: 'application/json'
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                const responseDataSet = camelizeKeys(response.data_set);
                const responseNextBidder = camelizeKeys(response.next_bidder);
                const responseStartPage = camelizeKeys(response.start_page);

                const connectedDataSet = dataSet === undefined ?
                    responseDataSet
                    :
                    dataSet.concat(responseDataSet);

                dispatch(replyListSuccess(
                    connectedDataSet,
                    responseNextBidder,
                    responseStartPage,
                ));
            })
            .catch((error) => {
                dispatch(replyListFailure());
            });
    };
}
