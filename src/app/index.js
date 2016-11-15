var angular = require('angular');
var ngMaterial = require('angular-material');
var uiRouter = require('angular-ui-router/release/angular-ui-router');
var initializationListener = require('./services/initialization-listener');
var core = require('./directives/core');

require('angular-material/angular-material.css');
require('font-awesome/css/font-awesome.css');
require('./style.css');
require('../style/app.css');

var gameList = require('../gameList');
var game = require('../game');

var app = angular.module('app', [
  'ngMaterial',
  'ui.router',
  'gameList',
  'game'
]);


app.directive('core', core);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state(gameList.state);
  $stateProvider.state(game.state);

  $urlRouterProvider.otherwise(function($injector) {
    $injector.get('$state').go('gameList');
  });
});

app.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('game')
    .backgroundPalette('blue').dark()
    .primaryPalette('grey')
    .accentPalette('green')
    .warnPalette('red');
});

app.run(initializationListener);

module.export = app;
