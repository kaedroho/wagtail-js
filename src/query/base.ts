import Wagtail from '../main';


export interface Results<Item> {
    totalCount: number;
    items: [Item];
}


export class Query<Item> {
    public filters: {} = {};
    public searchQuery: string = null;

    constructor(private wagtail: Wagtail) {
    }

    fetch(offset: number = 0, limit: number = 20): Promise<Results<Item>> {
        return;
    }

    fetchCount(): Promise<number> {
        return new Promise((resolve, reject) => {
            this.fetch(0, 0).then((results) => {
                resolve(results.totalCount);
            });
        });
    }

    fetchFirst(): Promise<Item> {
        return new Promise((resolve, reject) => {
            this.fetch(0, 1).then((results) => {
                resolve(results.items[0]);
            });
        });
    }

    fetchNth(n: number): Promise<Item> {
        return new Promise((resolve, reject) => {
            this.fetch(n, 1).then((results) => {
                resolve(results.items[0]);
            });
        });
    }

    private clone(): Query<Item> {
        const clone = new Query<Item>(this.wagtail);
        clone.filters = this.filters;
        clone.searchQuery = this.searchQuery;
        return clone;
    }

    filter(filters: {}): Query<Item> {
        const clone = this.clone();
        clone.filters = Object.assign({}, this.filters, filters);

        return clone;
    }

    search(searchQuery: string): Query<Item> {
        const clone = this.clone();
        clone.searchQuery = searchQuery;

        return clone;
    }
}
