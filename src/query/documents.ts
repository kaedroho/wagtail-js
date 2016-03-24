import {Query} from './base';


export interface Document {
    id: number,
    meta: {
        type: string,
        detail_url: string,
        download_url: string
    }
}


export class DocumentQuery extends Query<Document> {
    get endpointUrl() {
        return this.wagtail.baseUrl + '/documents/';
    }
}
