define(function(require) {
    var _ = require('underscore');
    var $ = require('jquery');
    var TEMPLATE = require('tpl!./error-view-hour.tpl');
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
                            "dimensions": [{"name": "ga:hour"}, {"name": "ga:pageTitle"}],
                            "dateRanges": [{"startDate": this.startDate, "endDate": this.endDate}],
                            "metrics": [{"expression": "ga:pageviews"}],
                            "dimensionFilterClauses": [
                                {
                                    "filters": [
                                        {
                                            "dimensionName": "ga:pageTitle",
                                            "operator": "EXACT",
                                            "expressions": ["CHECK_IN_ERROR_PAGE"]
                                        },
                                        {
                                            "dimensionName": "ga:pageTitle",
                                            "operator": "EXACT",
                                            "expressions": ["CHECK_IN_START_PAGE"]
                                        },
                                        {
                                            "dimensionName": "ga:pageTitle",
                                            "operator": "EXACT",
                                            "expressions": ["CHECK_IN_CONFIRMATION_PAGE"]
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
            data.addColumn('string', 'Hour');
            data.addColumn('number', 'Confirmation Page');
            data.addColumn('number', 'Error Page');
            data.addColumn('number', 'Start Page');
            var arr = [];
            _.each(info, function (obj, index) {
                if ((index % 3) !== 0) {
                    return;
                }
                var startPageObj = info[index + 1];
                var confPageObj = info[index + 2];
                arr.push([obj.dimensions[0], obj ? parseInt(obj.metrics[0].values[0]) : 0, startPageObj ? parseInt(startPageObj.metrics[0].values[0]) : 0, confPageObj ? parseInt(confPageObj.metrics[0].values[0]) : 0]);
            });
            data.addRows(arr);

            var startDate = moment(this.startDate).format("MMM Do");
            // Set chart options
            var options = {'title':'Hourly Error Statistics on ' + startDate,
                'width':'100%',
                'height':300,
                colors: ['green', 'red', 'blue']
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.LineChart(that.$el.find('#error-hour-views-container .graph').get(0));
            chart.draw(data, options);
        }
    });

    return View;
});