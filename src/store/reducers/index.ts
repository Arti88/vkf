import {NAV_TO_USER_PAGE_ACTION, NAV_TO_INDEX_PAGE_ACTION} from '../actions/index';
import {ICommonFriendsInitialState} from '../../interfaces/common-friends-initial-state.interface';

export const CommonFriendsReducer = (state: ICommonFriendsInitialState, action) => {
    switch (action.type) {
        case NAV_TO_USER_PAGE_ACTION:
            return state;
        case NAV_TO_INDEX_PAGE_ACTION:
            return state;
        default:
            return state;
    }
};