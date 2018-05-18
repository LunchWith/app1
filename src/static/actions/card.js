// import { push } from 'react-router-redux';

// // File Upload
// import { Field, reduxForm } from 'redux-form'
import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    CARD_POST_REQUEST,
    CARD_POST_SUCCESS,
    CARD_POST_FAILURE
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

        return fetch(`${SERVER_URL}/api/v1/card/post/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
    };
}


//         // inform MEMO POST API is starting
//         dispatch(memoPost());

//         function requestBasic() {
//             axios
//                 .post(
//                     'http://localhost:8000/api/memoWrite/noImage/',
//                     qs.stringify({
//                         contents,
//                         videoid,
//                     }),
//                     { withCredentials: true }
//                 )
//                 .then((response) => {
//                     dispatch(memoPostSuccess());
//                 })
//                 .catch((error) => {
//                     dispatch(memoPostFailure(error.response.data.code));
//                 });
//         }

//         function requestMultipart() {
//             const formData = new FormData();
//             formData.append('contents', contents);
//             formData.append('videoid', videoid);
//             formData.append('image', imageFile);

//             axios
//                 .post(
//                     'http://localhost:8000/api/memoWrite/withImage/',
//                     formData,
//                     {
//                         headers: {
//                             'content-type': 'multipart/form-data'
//                         },
//                         withCredentials: true,
//                     },
//                 )
//                 .then((response) => {
//                     dispatch(memoPostSuccess());
//                 })
//                 .catch((error) => {
//                     dispatch(memoPostFailure(error.response.data.code));
//                 });
//         }

//         return (
//             imageFile == '' ? requestBasic() : requestMultipart()
//         );


// export function memoPost(){
//     return{
//         type: MEMO_POST
//     }
// }


// export function memoPostSuccess(){
//     return{
//         type: MEMO_POST_SUCCESS
//     }
// }


// export function memoPostFailure(error){
//     return{
//         type: MEMO_POST_FAILURE,
//         error
//     }
// }


// // MEMO LIST
// export function memoListRequest(isInitial, listType, id, username){
//     return(dispatch) => {

//         // inform memo list API is starting
//         dispatch(memoList())

//         let url = 'http://localhost:8000/api/memoList/'

//         /* url setup depending on parameters, to be implemented */
//         if(typeof username === "undefined"){
//             url = isInitial ? url : `${url}${listType}/${id}/`

//         }else{
//             // load memos of specific user
//             // to be implemented
//         }

//         return(
//             axios
//                 .get(
//                     url
//                 )
//                 .then((response) => {
//                     dispatch(memoListSuccess(response.data, isInitial, listType))
//                 })
//                 .catch((error) => {
//                     dispatch(memoListFailure())
//                 })
//         )
//     }
// }


// export function memoList(){
//     return{
//         type: MEMO_LIST
//     }
// }


// export function memoListSuccess(data, isInitial, listType){
//     return{
//         type: MEMO_LIST_SUCCESS,
//         data,
//         isInitial,
//         listType,
//     }
// }


// export function memoListFailure(){
//     return{
//         type: MEMO_LIST_FAILURE,
//     }
// }
