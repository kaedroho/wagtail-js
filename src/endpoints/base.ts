import Wagtail from '../main';
import {Query} from '../query';


export class BaseEndpoint<Item> {
    constructor(private wagtail: Wagtail) {
    }

    all(): Query<Item> {
        return new Query<Item>(this);
    }

    countAll(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            // resolve(0);
        });
    }

    getById(id: number): Promise<Item> {
        return new Promise<Item>((resolve, reject) => {
        });
    }
}
