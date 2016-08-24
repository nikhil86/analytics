define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var B = require('bluebird');
    var Super = Backbone.Model;
    var View = require('view/view');
    var App = Super.extend({});


    App.prototype.initialize = function () {
        Super.prototype.initialize.apply(this, arguments);
        this.view = new View();
    };

    App.prototype.run = function () {
        var that = this;
        that.view.render();
        setTimeout(function () {
            that.run();
        }, 30000);
    };

    return App;
});