import {BaseEndpoint} from './base';


export interface Document {
    id: number,
    meta: {
        type: string,
        detail_url: string,
        download_url: string
    }
}


export class DocumentEndpoint extends BaseEndpoint<Document> {

}
