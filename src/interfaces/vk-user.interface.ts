export interface IVKUser {
    uid: number;
    first_name: string;
    last_name: string;
    deactivated?: string;
    hidden?: number;
    bdate?: string;
    sex?: number;
    photo_50?: string;
    counters?: {
        friends: number
    }
    isSelected?: boolean;
}