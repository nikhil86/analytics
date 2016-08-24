define(function(require) {
    var _ = require('underscore');
    var $ = require('jquery');
    var TEMPLATE = require('tpl!./day.tpl');
    var Chart = require('googlechart');
    var Super = require('./base');
    var moment = require('moment');
    var View = Super.extend({
        initialize: function () {
            Super.prototype.initialize.apply(this, arguments);
            this.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
            this.endDate = moment().format('YYYY-MM-DD');
            this.template = TEMPLATE;
        },

        getData: function () {
            return {
                "reportRequests":
                    [
                        {
                            "viewId": this.viewId,
                            "dimensions": [{"name": "ga:day"}],
                            "dateRanges": [{"startDate": this.startDate, "endDate": this.endDate}],
                            "metrics": [{"expression": "ga:sessions"}]
                        }
                    ]
            };
        },

        drawChart: function (rows) {
            var that = this;
            var info = rows.reports[0].data.rows;
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Day');
            data.addColumn('number', 'Sessions');
            var arr = [];
            var tt = '';
            _.each(info.slice(0, 10), function (obj) {
                tt += '{dimension: "' + obj.dimensions[0] +'", value: '+ obj.metrics[0].values[0] +'}';
                arr.push([obj.dimensions[0], parseInt(obj.metrics[0].values[0])]);
            });
            data.addRows(arr);

            var startDate = moment(this.startDate).format("MMM Do YY");
            var endDate = moment(this.endDate).format("MMM Do YY");
            // Set chart options
            var options = {'title':'Number of Sessions per Day between ' + startDate + ' and ' + endDate,
                'width':'100%',
                'height':300};

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.ColumnChart(that.$el.find('#day-container .graph').get(0));
            chart.draw(data, options);
        }
    });

    return View;
});