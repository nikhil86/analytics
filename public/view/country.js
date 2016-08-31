define(function(require) {
    var _ = require('underscore');
    var $ = require('jquery');
    var TEMPLATE = require('tpl!./country.tpl');
    var Chart = require('googlechart');
    var moment = require('moment');
    var Super = require('./base');
    var View = Super.extend({

        initialize: function () {
            Super.prototype.initialize.apply(this, arguments);
            this.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
            this.endDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
            this.template = TEMPLATE;
        },

        getData: function () {
            return {
                "reportRequests":
                    [
                        {
                            "viewId": this.viewId,
                            "dimensions": [{"name": "ga:country"}],
                            "dateRanges": [{"startDate": this.startDate, "endDate": this.endDate}],
                            "metrics": [{"expression": "ga:sessions"}],
                            "orderBys": [
                                {"fieldName": "ga:sessions", "sortOrder": "DESCENDING"}
                            ]
                        }
                    ]
            };
        },

        drawChart: function (rows) {
            var that = this;
            var info = rows.reports[0].data.rows;
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Country');
            data.addColumn('number', 'Sessions');
            var arr = [];
            _.each(info.slice(0, 10), function (obj) {
                arr.push([obj.dimensions[0], parseInt(obj.metrics[0].values[0])]);
            });
            data.addRows(arr);

            var startDate = moment(this.startDate).format("MMM Do");
            var endDate = moment(this.endDate).format("MMM Do");
            // Set chart options
            var options = {'title':'Number of Sessions per country between ' + startDate + ' and ' + endDate,
                'width':600,
                'height':300};

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(that.$el.find('#country-container .graph').get(0));
            chart.draw(data, options);
        }
    });

    return View;
});