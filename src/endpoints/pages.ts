import {BaseEndpoint} from './base';


export interface Page {
    id: number,
    meta: {
        type: string,
        detail_url: string,
        html_url: string
    }
}


export class PageEndpoint extends BaseEndpoint<Page> {
    getBySlug(slug: string): Promise<Page> {
        return new Promise<Page>((resolve, reject) => {
        });
    }
}
