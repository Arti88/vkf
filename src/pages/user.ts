import {rxStore} from '../store/store';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ICommonFriendsInitialState} from '../interfaces/common-friends-initial-state.interface';
import {Store} from 'redux';
import {IVKUser} from '../interfaces/vk-user.interface';
import {App} from '../app';

@inject(rxStore, App)
export class UserPage {

    private state: ICommonFriendsInitialState;
    private router: Router;
    private errorMsg: string = '';
    private userId: number;
    private addedBy: IVKUser[];
    private wallPosts: any[];
    private loaded: boolean;

    constructor(private rxStore: Store<ICommonFriendsInitialState>, appVM) {
        this.router = appVM.router;
    }

    activate(params): void {
        this.userId = +params.id;
        this.init();
    }

    init(): void {
        this.state = this.rxStore.getState();
        if (!this.state.selectedUserData) {
            this.router.navigateToRoute('main');
        } else {
            this.addedBy = this.state.selectedUserData;
            this.getWall();
        }
    }

    getWall(): void {
        this.errorMsg = '';
        this.loaded = false;
        VK.api('wall.get', {owner_id: this.userId}, data => {
            if (data.error) {
                this.loaded = true;
                this.showError(data.error.error_msg);
            } else {
                this.wallPosts = data.response;

                this.loaded = true;
            }
        });
    }

    showError(errorMsg: string = ''): void {
        this.errorMsg = `Не удалось получить содержимое Стены. ${errorMsg}`;
    }

}