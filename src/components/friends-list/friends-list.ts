import {bindable, bindingMode} from 'aurelia-framework';

import {IVKUser} from '../../interfaces/vk-user.interface';

export class FriendsList {
    @bindable({ defaultBindingMode: bindingMode.oneWay }) friends: IVKUser[];
    private title: string = 'Все друзья выбранных пользователей';
}