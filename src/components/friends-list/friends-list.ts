import {bindable, bindingMode, inject} from 'aurelia-framework';
import {IVKUser} from '../../interfaces/vk-user.interface';
import {rxStore} from '../../store/store';
import {ICommonFriendsInitialState} from '../../interfaces/common-friends-initial-state.interface';
import {Store} from 'redux';
import {FRIEND_SELECTED} from '../../store/actions/index';

@inject(rxStore)
export class FriendsList {
    @bindable({ defaultBindingMode: bindingMode.oneWay }) friends: IVKUser[];
    private title: string = 'Все друзья выбранных пользователей';

    constructor(private rxStore: Store<ICommonFriendsInitialState>) {}

    selectUser(user: IVKUser): void {
        this.rxStore.dispatch({
            type: FRIEND_SELECTED,
            payload: {
                selectedUserData: user.uid
            }
        })
    }
}