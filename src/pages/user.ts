import {rxStore} from '../store/store';
import {inject} from 'aurelia-framework';
import {ICommonFriendsInitialState} from '../interfaces/common-friends-initial-state.interface';
import {Store} from 'redux';

@inject(rxStore)
export class UserPage {

    constructor(private rxStore: Store<ICommonFriendsInitialState>) {
        this.checkState();
    }

    checkState(): void {
        const state: ICommonFriendsInitialState = this.rxStore.getState();
        if (!state.user) {
            //this.router.navigateToRoute('index');
        }
    }

}