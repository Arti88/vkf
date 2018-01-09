export interface IVKUser {
    uid: number;
    first_name: string;
    last_name: string;
    deactivated?: string;
    hidden?: number;
    bdate?: string;
    sex?: number;
    photo_50?: string;
    friends?: number[];
    counters?: {
        friends: number
    }
    isSelected?: boolean;
    popularityIndex?: number;
    age?: number;
}