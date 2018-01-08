import * as _ from 'lodash';

import {bindable, bindingMode} from 'aurelia-framework';

import {IVKUser} from '../../interfaces/vk-user.interface';
import {VK_FIELDS_GET_USERS} from '../../constants/fields-get-users.const';

export class UsersList {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) users: IVKUser[];
    private title: string = 'Управление списком';
    private errorMsg: string = '';
    private newUserId: string = '';

    addUser(): void {
        this.errorMsg = '';
        const id = this.extractUserId();
        if (!id) {
            this.showError('Invalid user id');
            return;
        }
        if (this.alreadyAdded(id)) {
            this.showError(`Duplicate user: ${id}`);
            return;
        }
        VK.api('users.get', {user_ids: [id], fields: VK_FIELDS_GET_USERS.join(',')}, data => {
            if (data.error) {
                this.showError(data.error.error_msg);
            } else {
                const user = data.response[0] as IVKUser;
                if (user.deactivated === 'deleted') {
                    this.showError('Account was deactivated and will not be added.');
                } else {
                    user.isSelected = false;
                    this.users.push(user);
                }

            }
            this.newUserId = '';
        });
    }

    removeUser(user: IVKUser): void {
        this.errorMsg = '';
        this.users.splice(this.users.indexOf(user), 1);
    }

    toggleUserSelection(user: IVKUser): void {
        this.errorMsg = '';
        user.isSelected = !user.isSelected;
    }

    extractUserId(): string {
        const m = /^(id)?(\d+)$/.exec(this.newUserId);
        return m ? m[2] : '';
    }

    showError(errorMsg: string = ''): void {
        this.newUserId = '';
        this.errorMsg = errorMsg || 'Произошла неизвестная ошибка';
    }

    alreadyAdded(uid: string): boolean {
        return _.findIndex(this.users, {uid: +uid}) > -1;
    }
}