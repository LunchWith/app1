import {
    CARD_POST_REQUEST,
    CARD_POST_SUCCESS,
    CARD_POST_FAILURE,

    CARD_LIST_REQUEST,
    CARD_LIST_SUCCESS,
    CARD_LIST_FAILURE,

    CARD_CHANGE_SUCCESS,
    CARD_CHANGE_REQUEST,
    CARD_CHANGE_FAILURE,
} from '../constants';


const initialState = {
    dataSet: [],
};

export default function cardReducer(state = initialState, action) {
    switch (action.type) {
        case CARD_POST_REQUEST:
            return Object.assign({}, state, {
            });

        case CARD_POST_SUCCESS:
            return Object.assign({}, state, {
            });

        case CARD_POST_FAILURE:
            return Object.assign({}, state, {
            });

        case CARD_LIST_REQUEST:
            return Object.assign({}, state, {
            });

        case CARD_LIST_SUCCESS:
            return Object.assign({}, state, {
                dataSet: action.payload.dataSet,
            });

        case CARD_LIST_FAILURE:
            return Object.assign({}, state, {
            });

        case CARD_CHANGE_REQUEST:
            return Object.assign({}, state, {
            });

        case CARD_CHANGE_SUCCESS:
            return Object.assign({}, state, {
                dataSet: action.payload.dataSet,
            });

        case CARD_CHANGE_FAILURE:
            return Object.assign({}, state, {
            });

        default:
            return state;
    }
}
