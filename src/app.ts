import {inject} from 'aurelia-framework';

import {IVKUser} from './interfaces/vk-user.interface';
import {ICommonFriendsInitialState} from './interfaces/common-friends-initial-state.interface';
import {Store} from 'redux';
import {rxStore} from './store/store';

@inject(rxStore)
export class App {

    constructor(private rxStore: Store<ICommonFriendsInitialState>) {}

    public users: IVKUser[] = [];
    public friends: IVKUser[] = [];

    findAllFriends(): void {

    }
}
