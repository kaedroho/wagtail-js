import {BaseEndpoint} from './base';


export interface Image {
    id: number,
    meta: {
        type: string,
        detail_url: string
    }
}


export class ImageEndpoint extends BaseEndpoint<Image> {

}
