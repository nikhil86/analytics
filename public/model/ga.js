define(function (require) {
    var B = require('bluebird');
    var _ = require('underscore');
    var Model = Backbone.Model.extend({});
    var VIEW_ID = '68545212';
    var googleapi = require('googleapi');
    var config = require('config');

    Model.prototype.queryReports = function (data) {
        var that = this;
        return new B(function (resolve, reject) {
            function onLoadFn() {
                gapi.client.setApiKey(config.apiKey);
                if (gapi.auth2.getAuthInstance().isSignedIn.hg) {
                    return that.makeRequest(data, resolve)
                } else {
                    gapi.auth2.getAuthInstance().isSignedIn.listen(function () {
                        return that.makeRequest(data, resolve)
                    });
                }
            }
            gapi.load("client", onLoadFn);
        });
    };

    Model.prototype.makeRequest = function (data, resolve) {
        return gapi.client.request({
            path: '/v4/reports:batchGet',
            root: 'https://analyticsreporting.googleapis.com/',
            method: 'POST',
            body: data
        }).then(function (response) {
                return resolve(response.result);
            },
            console.error.bind(console));
    };

    return Model;
});
