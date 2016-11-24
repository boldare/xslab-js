var angular = require('angular');
var ngMaterial = require('angular-material');
var uiRouter = require('angular-ui-router/release/angular-ui-router');
var mgDable = require('angular-material-data-table');
var firebase = require('firebase');

var initializationListener = require('./services/initialization-listener');
var transitionListener = require('./services/transition-listener');
var core = require('./directives/core');
var gameList = require('../gameList');
var gameRoom = require('../gameRoom');
var game = require('../game');
var firebaseConfig = require('./firebase-config');

require('angular-material/angular-material.css');
require('angular-material-data-table/dist/md-data-table.css');
require('material-design-icons/iconfont/material-icons.css');
require('./style.css');
require('../style/app.css');
require('angularfire');


var app = angular.module('app', [
  "firebase",
  'ngMaterial',
  'md.data.table',
  'ui.router',
  'gameList',
  'gameRoom',
  'game'
]);

app.service('firebase', function() {
  return firebase.initializeApp(firebaseConfig);
});

app.directive('xsCore', core);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state(gameList.state);
  $stateProvider.state(gameRoom.state);
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

app.config(function($mdIconProvider) {
  $mdIconProvider.fontSet('md', 'material-icons');
});

app.run(initializationListener);
app.run(transitionListener);

app.filter('formatGameStatus', function() {
  return function(input) {
    switch (input) {
      case 'WAIT_FOR_PLAYERS': return 'Waiting for players';
      case 'IN_PROGRESS': return 'In progress';
      case 'FINISHED': return 'Finished';
      default: return input;
    }
  };
});

module.export = app;
