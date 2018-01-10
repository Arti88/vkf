import {ICommonFriendsInitialState} from '../interfaces/common-friends-initial-state.interface';
import {IVKUser} from '../interfaces/vk-user.interface';

export const COMMON_FRIENDS_INITIAL_STATE = {
    users: [] as IVKUser[],
    friends: [] as IVKUser[],
    selectedUserData: undefined,
    popularity: undefined

} as ICommonFriendsInitialState;