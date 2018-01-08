import {IVKUser} from '../../interfaces/vk-user.interface';

export class UsersList {
    private title: string = 'Управление списком';
    private users: IVKUser[] = [];
    private newUserId: string = '';

    addUser(): void {
        this.users.push({first_name: 'Arti', last_name: 'Urskov'} as IVKUser);
        this.newUserId = '';
    }

    removeUser(user: IVKUser): void {
        this.users.splice(this.users.indexOf(user), 1);
    }

    toggleUserSelection(user: IVKUser): void {

    }

    extractUserId(userId: string): string {
        const m = /^(id)?(\d+)$/.exec(userId);
        return m ? m[2] : '';
    }
}