import {IVKUser} from '../../interfaces/vk-user.interface';
import {VK_FIELDS_GET_USERS} from '../../constants/fields-get-users.const';

export class UsersList {
    private title: string = 'Управление списком';
    private users: IVKUser[] = [];
    private newUserId: string = '';

    addUser(): void {
        const id = this.extractUserId();
        VK.api('users.get', {user_ids: [id], fields: VK_FIELDS_GET_USERS.join(',')}, data => {
            const user = data.response[0] as IVKUser;
            user.isSelected = false;
            this.users.push(user);
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
}