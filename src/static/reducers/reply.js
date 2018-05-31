import {
    REPLY_LIST_REQUEST,
    REPLY_LIST_SUCCESS,
    REPLY_LIST_FAILURE,
} from '../constants';


const initialState = {
    replyDataSet_null: [],
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
                // replyDataSet → dynamic json key by card
                ['replyDataSet_'.concat(cardId)]: action.payload.dataSet,
                ['nextBidder_'.concat(cardId)]: action.payload.nextBidder,
            });
        }

        case REPLY_LIST_FAILURE:
            return Object.assign({}, state, {
            });

        default:
            return state;
    }
}
