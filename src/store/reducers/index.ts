import {
    NAV_TO_USER_PAGE_ACTION,
    FRIEND_SELECTED, CLEAR_DATA_ACTION
} from '../actions/index';
import {ICommonFriendsInitialState} from '../../interfaces/common-friends-initial-state.interface';

export const CommonFriendsReducer = (state: ICommonFriendsInitialState, action) => {
    switch (action.type) {
        case CLEAR_DATA_ACTION:
            state.selectedUserData = undefined;
            state.friends = undefined;
            state.users = undefined;
            state.popularity = undefined;
            return state;
        case NAV_TO_USER_PAGE_ACTION:
            if (action.payload.selectedUserData && action.payload.friends && action.payload.users && action.payload.popularity) {
                state.selectedUserData = action.payload.selectedUserData;
                state.friends = action.payload.friends;
                state.users = action.payload.users;
                state.popularity = action.payload.popularity;
            }
            return state;
        case FRIEND_SELECTED:
            if (action.payload.selectedUserData) {
                state.selectedUserData = action.payload.selectedUserData;
                state.friends = undefined;
                state.users = undefined;
                state.popularity = undefined;
            }
            return state;
        default:
            return state;
    }
};