import {PageEndpoint} from './endpoints/pages';
import {ImageEndpoint} from './endpoints/images';
import {DocumentEndpoint} from './endpoints/documents';


export default class Wagtail {
    constructor(private baseUrl: string) {
    }

    get pages(): PageEndpoint {
        return new PageEndpoint(this);
    }

    get images(): ImageEndpoint {
        return new ImageEndpoint(this);
    }

    get documents(): DocumentEndpoint {
        return new DocumentEndpoint(this);
    }
}


let test = new Wagtail("http://wagtail-admin-api.demo.torchboxapps.com/api/v1/");

test.pages.getById(1).then((page) => {
    page.meta.type
});

test.pages.countAll();

test.pages.all()
test.pages.getBySlug("test");
test.pages.all().filter({title: "test"}).search("Hello");
