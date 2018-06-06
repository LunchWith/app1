import {
    REPLY_LIST_REQUEST,
    REPLY_LIST_SUCCESS,
    REPLY_LIST_FAILURE,
} from '../constants';


const initialState = {
};


export default function replyReducer(state = initialState, action) {
    switch (action.type) {
        case REPLY_LIST_REQUEST:
            return Object.assign({}, state, {
            });

        case REPLY_LIST_SUCCESS:
        {
            const cardId = action.payload.dataSet[0].cardId;
            return Object.assign({}, state, {
                // replyDataSet → dynamic json key by card
                ['replyDataSet_'.concat(cardId)]: action.payload.dataSet,
                ['nextBidder_'.concat(cardId)]: action.payload.nextBidder,
                ['startPage_'.concat(cardId)]: action.payload.startPage,
            });
        }

        case REPLY_LIST_FAILURE:
            return Object.assign({}, state, {
            });

        default:
            return state;
    }
}
