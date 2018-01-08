import {CommonFriendsReducer} from './reducers/index';
import {createStore} from 'redux';
import {COMMON_FRIENDS_INITIAL_STATE} from '../constants/common-friends-initial-state.constant';

function configureStore() {
    return createStore(CommonFriendsReducer, COMMON_FRIENDS_INITIAL_STATE);
}

export const rxStore = configureStore();