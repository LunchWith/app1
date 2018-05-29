import {
    REPLY_LIST_REQUEST,
    REPLY_LIST_SUCCESS,
    REPLY_LIST_FAILURE,
} from '../constants';


const initialState = {
    dataSet: [],
};

export default function replyReducer(state = initialState, action) {
    switch (action.type) {
        case REPLY_LIST_REQUEST:
            return Object.assign({}, state, {
            });

        case REPLY_LIST_SUCCESS:
            return Object.assign({}, state, {
                dataSet: action.payload.dataSet,
            });
        case REPLY_LIST_FAILURE:
            return Object.assign({}, state, {
            });

        default:
            return state;
    }
}
