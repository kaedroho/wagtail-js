import {Query} from './base';


export interface Page {
    id: number,
    meta: {
        type: string,
        detail_url: string,
        html_url: string
    }
}


export class PageQuery extends Query<Page> {
    get endpointUrl() {
        return this.wagtail.baseUrl + '/pages/';
    }
}
