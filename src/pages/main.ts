import * as moment from 'moment';
import * as _ from 'lodash';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {IVKUser} from '../interfaces/vk-user.interface';
import {ICommonFriendsInitialState} from '../interfaces/common-friends-initial-state.interface';
import {Store} from 'redux';
import {rxStore} from '../store/store';
import {VK_USER_FIELDS} from '../constants/vk-user-fields.const';
import {NAV_TO_USER_PAGE_ACTION, CLEAR_DATA_ACTION} from '../store/actions/index';
import {App} from '../app';

@inject(rxStore, App)
export class MainPage {
    public users: IVKUser[] = [];
    public friends: IVKUser[] = [];
    private popularity: {[key: string]: number[]} = {};
    private state: ICommonFriendsInitialState;
    private router: Router;
    private loaded: boolean;

    constructor(private rxStore: Store<ICommonFriendsInitialState>, appVM) {
        this.router = appVM.router;
        this.init();
    }

    init(): void {
        const state = this.rxStore.getState();
        if (state.users && state.friends && state.popularity) {
            this.users = state.users;
            this.friends = state.friends;
            this.popularity = state.popularity;
            this.rxStore.dispatch({
                type: CLEAR_DATA_ACTION,
                payload: {}
            });
        }
        this.rxStore.subscribe(() => {
            const updatedState = this.rxStore.getState();
            if (!updatedState.users && !updatedState.friends && !updatedState.popularity && updatedState.selectedUserData) {
                this.selectUser(updatedState.selectedUserData)
            }
        });
    }

    findAllFriends(): void {
        if (this.emptySelection()) {
            alert('Выберите хотя бы одного пользователя из списка, нажав на соотв. панель');
            return;
        }
        this.friends = [];
        this.popularity = {};
        this.users.forEach((v: IVKUser) => {
            if (v.isSelected) {
                v.friends.forEach((friendId: number) => {
                    if (!this.popularity[friendId]) {
                        this.popularity[friendId] = [v.uid];
                    } else {
                        this.popularity[friendId].push(v.uid);
                    }
                });
            }
        });
        let ids = Object.keys(this.popularity);
        if (!ids.length) {
            alert('У всех выбранных Вами пользователей нет друзей.');
            return;
        }
        this.loaded = false;
        VK.api('users.get', {user_ids: ids, fields: VK_USER_FIELDS.join(',')}, data => {
            let friends = data.response as IVKUser[];
            const popularityValues: number[] = Object.values(this.popularity).map(popularities => popularities.length);
            const lessPopular = Math.min.apply(null, popularityValues);
            const mostPopular = Math.max.apply(null, popularityValues);
            const opacityStep = lessPopular !== mostPopular ? 1/(mostPopular - lessPopular) : 0;
            if (!opacityStep) {
                friends.forEach((v: IVKUser) => {
                    v.popularityIndex = 1;
                    v.age = /\d+.\d+.\d{4,}/.test(v.bdate)
                        ? Math.floor(moment(new Date()).diff(moment(v.bdate, "D.M.YYYY"),'years',true))
                        : 0;
                });
            } else {
                friends.forEach((v: IVKUser) => {
                    v.popularityIndex = opacityStep * (this.popularity[v.uid].length - lessPopular);
                    v.age = /\d+.\d+.\d{4,}/.test(v.bdate)
                        ? Math.floor(moment(new Date()).diff(moment(v.bdate, "D.M.YYYY"),'years',true))
                        : 0;
                });
            }
            friends.sort((a: IVKUser, b: IVKUser) => {
                if (`${a.last_name} ${a.first_name}` < `${b.last_name} ${b.first_name}`) {
                    return -1;
                } else if (`${a.last_name} ${a.first_name}` > `${b.last_name} ${b.first_name}`) {
                    return 1;
                }
                return 0;
            });
            this.friends = friends;
            this.loaded = true;
        });
    }

    emptySelection(): boolean {
        return this.users.findIndex((user) => { return user.isSelected; }) === -1;
    }

    selectUser(userId: number): void {
        const userFriends: IVKUser[] = _.filter(this.users, (u: IVKUser) => {
            return this.popularity[userId].indexOf(u.uid) > -1;
        });
        const payload: any = {
            selectedUserData: userFriends,
            popularity: this.popularity,
            users: this.users,
            friends: this.friends
        };
        this.rxStore.dispatch({
            type: NAV_TO_USER_PAGE_ACTION,
            payload
        });
        this.router.navigateToRoute('user', {id: userId});
    }
}
