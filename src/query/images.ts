import {Query} from './base';


export interface Image {
    id: number,
    meta: {
        type: string,
        detail_url: string
    }
}


export class ImageQuery extends Query<Image> {

}
