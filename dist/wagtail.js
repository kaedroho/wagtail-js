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
        Object.defineProperty(Query.prototype, "endpointUrl", {
            get: function () {
                return this.wagtail.baseUrl;
            },
            enumerable: true,
            configurable: true
        });
        Query.prototype.fetch = function (offset, limit) {
            var _this = this;
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = 20; }
            var params = {
                offset: offset,
                limit: limit
            };
            var query = Object.keys(params).reduce(function (a, k) { a.push(k + '=' + encodeURIComponent(params[k])); return a; }, []).join('&');
            return new Promise(function (resolve, reject) {
                fetch(_this.endpointUrl + '?' + query).then(function (response) {
                    response.json().then(function (data) {
                        resolve({
                            totalCount: data.meta.total_count,
                            items: data.items || data.pages || data.images || data.documents
                        });
                    });
                });
            });
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
            var clone = new Query(this.wagtail);
            clone.filters = this.filters;
            clone.searchQuery = this.searchQuery;
            return clone;
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
        Object.defineProperty(PageQuery.prototype, "endpointUrl", {
            get: function () {
                return this.wagtail.baseUrl + '/pages/';
            },
            enumerable: true,
            configurable: true
        });
        return PageQuery;
    }(Query));

    var ImageQuery = (function (_super) {
        __extends(ImageQuery, _super);
        function ImageQuery() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(ImageQuery.prototype, "endpointUrl", {
            get: function () {
                return this.wagtail.baseUrl + '/images/';
            },
            enumerable: true,
            configurable: true
        });
        return ImageQuery;
    }(Query));

    var DocumentQuery = (function (_super) {
        __extends(DocumentQuery, _super);
        function DocumentQuery() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(DocumentQuery.prototype, "endpointUrl", {
            get: function () {
                return this.wagtail.baseUrl + '/documents/';
            },
            enumerable: true,
            configurable: true
        });
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

    return Wagtail;

}());