define(function(require) {
    var _ = require('underscore');
    var $ = require('jquery');
    var TEMPLATE = require('tpl!./pageviews.tpl');
    var Chart = require('googlechart');
    var Super = require('./base');
    var moment = require('moment');
    var View = Super.extend({
        initialize: function () {
            Super.prototype.initialize.apply(this, arguments);
            this.startDate = moment().format('YYYY-MM-DD');
            this.endDate = moment().format('YYYY-MM-DD');
            this.template = TEMPLATE;
        },

        getData: function () {
            return {
                "reportRequests":
                    [
                        {
                            "viewId": this.viewId,
                            "dimensions": [{"name": "ga:pageTitle"}],
                            "dateRanges": [{"startDate": this.startDate, "endDate": this.endDate}],
                            "metrics": [{"expression": "ga:pageviews"}],
                            "dimensionFilterClauses": [
                                {
                                    "filters": [
                                        {
                                            "dimensionName": "ga:pageTitle",
                                            "operator": "BEGINS_WITH",
                                            "expressions": ["CHECK_IN"]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
            };
        },

        drawChart: function (rows) {
            var that = this;
            var info = rows.reports[0].data.rows;
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Page Name');
            data.addColumn('number', 'Page Views');
            var arr = [];
            _.each(info, function (obj) {
                arr.push([obj.dimensions[0], parseInt(obj.metrics[0].values[0])]);
            });
            data.addRows(arr);

            var startDate = moment(this.startDate).format("MMM Do YY");
            // Set chart options
            var options = {'title':'Page View Statisics for ' + startDate,
                'width':'100%',
                'height':300};

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.ColumnChart(that.$el.find('#page-views-container .graph').get(0));
            chart.draw(data, options);
        }
    });

    return View;
});