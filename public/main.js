require(
    {
        paths: {
            backbone: 'vendors/backbone.min',
            underscore: 'vendors/lodash.custom.min',
            jquery: 'vendors/jquery-2.1.4.min',
            bluebird: 'vendors/bluebird.min',
            text: 'vendors/text',
            tpl: 'vendors/tpl',
            bootstrap: 'vendors/bootstrap/js/bootstrap.min',
            googleapi: 'vendors/googleapi',
            googlechart: 'vendors/googlechart',
            moment: 'vendors/moment.min'
        },
        shim: {
            backbone: {
                deps: ['jquery', 'underscore'],
                exports: 'Backbone'
            },
            bootstrap: {
                deps: ['jquery']
            },
            'app': {
                deps: ['underscore', 'backbone', 'bootstrap']
            }
        }
    },
    ['app'],
    function (App) {
        google.charts.load('current', {'packages':['corechart']});
        window.app = new App({});
        window.app.run();
    }
);