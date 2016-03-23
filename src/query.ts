import {BaseEndpoint} from './endpoints/base';


export interface Results<Item> {
    totalCount: number;
    items: [Item];
}


export class Query<Item> {
    private filters: {} = {};
    private searchQuery: string = null;

    constructor(private endpoint: BaseEndpoint<Item>) {

    }

    count(): Promise<number> {
        return;
    }

    getPage(offset: number = 0, limit: number = 20): Promise<Results<Item>> {
        return;
    }

    getNth(n: number): Promise<Item> {
        return new Promise((resolve, reject) => {
            this.getPage(n, 1).then((results) => {
                resolve(results.items[0]);
            });
        });
    }

    filter(filters: {}): Query<Item> {
        const clone = new Query<Item>(this.endpoint);
        clone.filters = Object.assign({}, this.filters, filters);
        clone.searchQuery = this.searchQuery;

        return clone;
    }

    search(searchQuery: string): Query<Item> {
        const clone = new Query<Item>(this.endpoint);
        clone.filters = this.filters;
        clone.searchQuery = searchQuery;

        return clone;
    }
}
