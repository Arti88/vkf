import * as moment from 'moment';
import {inject} from 'aurelia-framework';
import {IVKUser} from '../interfaces/vk-user.interface';
import {ICommonFriendsInitialState} from '../interfaces/common-friends-initial-state.interface';
import {Store} from 'redux';
import {rxStore} from '../store/store';
import {VK_USER_FIELDS} from '../constants/vk-user-fields.const';

@inject(rxStore)
export class MainPage {

    constructor(private rxStore: Store<ICommonFriendsInitialState>) {}

    public users: IVKUser[] = [];
    public friends: IVKUser[] = [];

    private loaded: boolean;

    findAllFriends(): void {
        if (this.emptySelection()) {
            alert('Выберите хотя бы одного пользователя из списка, нажав на соотв. панель');
            return;
        }
        this.friends = [];
        let popularity: {[key: string]: number[]} = {};
        this.users.forEach((v: IVKUser) => {
            if (v.isSelected) {
                v.friends.forEach((friendId: number) => {
                    if (!popularity[friendId]) {
                        popularity[friendId] = [v.uid];
                    } else {
                        popularity[friendId].push(v.uid);
                    }
                });
            }
        });
        let ids = Object.keys(popularity);
        if (!ids.length) {
            alert('У всех выбранных Вами пользователей нет друзей.');
            return;
        }
        this.loaded = false;
        VK.api('users.get', {user_ids: ids, fields: VK_USER_FIELDS.join(',')}, data => {
            let friends = data.response as IVKUser[];
            const popularityValues: number[] = Object.values(popularity).map(popularities => popularities.length);
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
                    v.popularityIndex = opacityStep * (popularity[v.uid].length - lessPopular);
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
}
