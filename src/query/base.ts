import Wagtail from '../main';


export interface Results<Item> {
    totalCount: number;
    items: [Item];
}


export class Query<Item> {
    public filters: {} = {};
    public searchQuery: string = null;

    constructor(public wagtail: Wagtail) {
    }

    get endpointUrl() {
        return this.wagtail.baseUrl;
    }

    fetch(offset: number = 0, limit: number = 20): Promise<Results<Item>> {
        let params = {
            offset: offset,
            limit: limit
        };

        let query = Object.keys(params).reduce(function(a,k){a.push(k+'='+encodeURIComponent(params[k]));return a},[]).join('&');

        return new Promise<Results<Item>>((resolve, reject) => {
            fetch(this.endpointUrl + '?' + query).then((response) => {
                response.json().then((data) => {
                    resolve({
                        totalCount: data.meta.total_count,
                        items: data.items || data.pages || data.images || data.documents
                    });
                });
            });
        });
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
