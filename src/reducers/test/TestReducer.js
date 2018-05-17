import * as testConstants from '../../constants/TestConstants';
import update from 'immutability-helper';

const initialState = {
    status: 'INIT',
    Message: '',
}


export function testReducer(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
            case testConstants.TEST_DO:
                return update(state, {
                    status: { $set: 'WAITING '}
                });
            case testConstants.TEST_SUCCESS:
                return update(state, {
                    status: { $set: 'SUCCESS' },
                    Message: { $set: action.Message },
                });
            case testConstants.TEST_FAILURE:
                return update(state, {
                    Message: { $set: 'FAILURE' }
                });
            default:
                return state;
    }
}