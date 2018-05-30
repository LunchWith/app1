import {
    REPLY_LIST_REQUEST,
    REPLY_LIST_SUCCESS,
    REPLY_LIST_FAILURE,
} from '../constants';


const initialState = {
    dataSet_null: [],
};


export default function replyReducer(state = initialState, action) {
    switch (action.type) {
        case REPLY_LIST_REQUEST:
            return Object.assign({}, state, {
            });

        case REPLY_LIST_SUCCESS:
        {
            let cardId = null;
            if (action.payload.dataSet.length !== 0) {
                cardId = action.payload.dataSet[0].card_id;
            }
            return Object.assign({}, state, {
                // reply → dynamic json key by card
                ['dataSet_'.concat(cardId)]: action.payload.dataSet
            });
        }

        case REPLY_LIST_FAILURE:
            return Object.assign({}, state, {
            });

        default:
            return state;
    }
}
