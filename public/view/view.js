define(function(require) {
    var _ = require('underscore');
    var $ = require('jquery');
    var B = require('bluebird');
    var TEMPLATE = require('tpl!./view.tpl');
    var Model = require('model/ga');
    var Country = require('view/country');
    var Browser = require('view/browser');
    var Hourly = require('view/hourly');
    var Day = require('view/day');
    var PageViews = require('view/pageviews');
    var ErrorDay = require('view/error-view-day');
    var ErrorHour = require('view/error-view-hour');
    var Super = Backbone.View;

    var View = Super.extend({
        el: $('.content'),

        initialize: function () {
            Super.prototype.initialize.apply(this, arguments);
            this.counter = 0;
            this.viewIds = {
                '68545212': 'Etihad',
                '73430559': 'SY'
            };
        },

        getViewId: function () {
            var keys = _.keys(this.viewIds);
            return keys[(this.counter++) % keys.length];
        },

        render: function () {
            var viewId = this.getViewId();
            this.$el.html(TEMPLATE({storeFront: this.viewIds[viewId]}));
            var country = new Country({el: this.$el.find('#country-chart'), viewId: viewId});
            var browser = new Browser({el: this.$el.find('#browser-chart'), viewId: viewId});
            var hourly = new Hourly({el: this.$el.find('#hourly-chart'), viewId: viewId});
            var day = new Day({el: this.$el.find('#day-chart'), viewId: viewId});
            var pageViews = new PageViews({el: this.$el.find('#page-views-chart'), viewId: viewId});
            var errorDay = new ErrorDay({el: this.$el.find('#error-day-chart'), viewId: viewId});
            var errorHour = new ErrorHour({el: this.$el.find('#error-hour-chart'), viewId: viewId});
            country.render();
            browser.render();
            hourly.render();
            day.render();
            pageViews.render();
            errorDay.render();
            errorHour.render();
        }
    });

    return View;
});