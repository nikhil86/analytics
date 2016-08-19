define(function(require) {
    var _ = require('underscore');
    var $ = require('jquery');
    var Model = require('model/ga');
    var Chart = require('googlechart');
    var Super = Backbone.View;
    var moment = require('moment');
    var View = Super.extend({
        initialize: function (options) {
            Super.prototype.initialize.apply(this, arguments);
            this.viewId = options.viewId;
            this.on('RERENDER', this.render);
        },

        render: function () {
            var that = this;
            this.$el.empty();
            this.$el.html(this.template({
                startDate: this.startDate,
                endDate: this.endDate
            }));
            var model = new Model();
            model.queryReports(that.getData())
                .then(function (data) {
                    google.charts.setOnLoadCallback(that.drawChart.bind(that, data));
                });
            var events = {};
            events['click .settings'] = 'onSettingsClick';
            that.delegateEvents(events);
        },

        onSettingsClick: function () {
            this.$el.find('.modal').modal();
            var that = this;
            this.$el.find('.modal').on('click', '.update', function () {
                that.startDate = that.$el.find('.start-date').val();
                var endDate = that.$el.find('.end-date');
                that.endDate = endDate.length > 0 ? endDate.val() : that.startDate;
                that.$el.find('.modal').hide();
                setTimeout(function () {
                    that.trigger('RERENDER');
                }, 500);
            });
            this.$el.find('.modal').on('hidden.bs.modal', function () {
                that.$el.find('.modal').unbind();
            });
        }

    });

    return View;
});