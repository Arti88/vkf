import {FIND_ALL_FRIENDS_ACTION} from '../actions/index';
import {ICommonFriendsInitialState} from '../../interfaces/common-friends-initial-state.interface';

export const CommonFriendsReducer = (state: ICommonFriendsInitialState, action) => {
    switch (action.type) {
        case FIND_ALL_FRIENDS_ACTION:
            if (action.payload.users.length && action.payload.selectedUsers && action.payload.selectedUsers.length > 2) {
                state.selectedUsers = action.payload.selectedUsers;
            } else {
                state.selectedUsers = [];
            }
            return state;
        default:
            return state;
    }
};