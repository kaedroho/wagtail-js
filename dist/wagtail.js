var Wagtail = (function () {
    'use strict';

    function __extends(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var Query = (function () {
        function Query(wagtail) {
            this.wagtail = wagtail;
            this.filters = {};
            this.searchQuery = null;
        }
        Query.prototype.fetch = function (offset, limit) {
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = 20; }
            return;
        };
        Query.prototype.fetchCount = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.fetch(0, 0).then(function (results) {
                    resolve(results.totalCount);
                });
            });
        };
        Query.prototype.fetchFirst = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.fetch(0, 1).then(function (results) {
                    resolve(results.items[0]);
                });
            });
        };
        Query.prototype.fetchNth = function (n) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.fetch(n, 1).then(function (results) {
                    resolve(results.items[0]);
                });
            });
        };
        Query.prototype.clone = function () {
            return Object.assign({}, this);
        };
        Query.prototype.filter = function (filters) {
            var clone = this.clone();
            clone.filters = Object.assign({}, this.filters, filters);
            return clone;
        };
        Query.prototype.search = function (searchQuery) {
            var clone = this.clone();
            clone.searchQuery = searchQuery;
            return clone;
        };
        return Query;
    }());

    var PageQuery = (function (_super) {
        __extends(PageQuery, _super);
        function PageQuery() {
            _super.apply(this, arguments);
        }
        return PageQuery;
    }(Query));

    var ImageQuery = (function (_super) {
        __extends(ImageQuery, _super);
        function ImageQuery() {
            _super.apply(this, arguments);
        }
        return ImageQuery;
    }(Query));

    var DocumentQuery = (function (_super) {
        __extends(DocumentQuery, _super);
        function DocumentQuery() {
            _super.apply(this, arguments);
        }
        return DocumentQuery;
    }(Query));

    var Wagtail = (function () {
        function Wagtail(baseUrl) {
            this.baseUrl = baseUrl;
        }
        Object.defineProperty(Wagtail.prototype, "pages", {
            get: function () {
                return new PageQuery(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Wagtail.prototype, "images", {
            get: function () {
                return new ImageQuery(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Wagtail.prototype, "documents", {
            get: function () {
                return new DocumentQuery(this);
            },
            enumerable: true,
            configurable: true
        });
        return Wagtail;
    }());
    var test = new Wagtail("http://wagtail-admin-api.demo.torchboxapps.com/api/v1/");
    test.pages.filter({ 'field': 'value' }).search("Test").fetch().then(function (results) {
        for (var _i = 0, _a = results.items; _i < _a.length; _i++) {
            var page = _a[_i];
            page.id;
        }
    });

    return Wagtail;

}());
//# sourceMappingURL=wagtail.js.map
