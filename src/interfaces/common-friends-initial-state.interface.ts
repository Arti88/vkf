import {IVKUser} from './vk-user.interface';

export interface ICommonFriendsInitialState {
    users: IVKUser[];
    selectedUsers: IVKUser[];
}