import {IVKUser} from '../../interfaces/vk-user.interface';
import {VK_FIELDS_GET_USERS} from '../../constants/fields-get-users.const';

export class UsersList {
    private title: string = 'Управление списком';
    private users: IVKUser[] = [];
    private errorMsg: string = '';
    private newUserId: string = '';

    addUser(): void {
        this.errorMsg = '';
        const id = this.extractUserId();
        if (!id) {
            this.showError('Invalid user id');
            return;
        }
        VK.api('users.get', {user_ids: [id], fields: VK_FIELDS_GET_USERS.join(',')}, data => {
            if (data.error) {
                this.showError(data.error.error_msg);
            } else {
                const user = data.response[0] as IVKUser;
                user.isSelected = false;
                this.users.push(user);
            }
            this.newUserId = '';
        });
    }

    removeUser(user: IVKUser): void {
        this.users.splice(this.users.indexOf(user), 1);
    }

    toggleUserSelection(user: IVKUser): void {
        user.isSelected = !user.isSelected;
    }

    extractUserId(): string {
        const m = /^(id)?(\d+)$/.exec(this.newUserId);
        return m ? m[2] : '';
    }

    showError(errorMsg: string = ''): void {
        this.errorMsg = errorMsg || 'Произошла неизвестная ошибка';
    }
}