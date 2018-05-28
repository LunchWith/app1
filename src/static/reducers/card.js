import {
    CARD_LIST_REQUEST,
    CARD_LIST_SUCCESS,
    CARD_LIST_FAILURE,
} from '../constants';


const initialState = {
    dataSet: [],
};

export default function cardReducer(state = initialState, action) {
    switch (action.type) {
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

        default:
            return state;
    }
}
