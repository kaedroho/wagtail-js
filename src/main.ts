import {PageQuery} from './query/pages';
import {ImageQuery} from './query/images';
import {DocumentQuery} from './query/documents';


export default class Wagtail {
    constructor(private baseUrl: string) {
    }

    get pages(): PageQuery {
        return new PageQuery(this);
    }

    get images(): ImageQuery {
        return new ImageQuery(this);
    }

    get documents(): DocumentQuery {
        return new DocumentQuery(this);
    }
}


let test = new Wagtail("http://wagtail-admin-api.demo.torchboxapps.com/api/v1/");

test.pages.filter({'field': 'value'}).search("Test").fetch().then((results) => {
    for (let page of results.items) {
        page.id;
    }
});
