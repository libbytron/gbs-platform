(function() {

  'use strict';

  angular.module('app', [
        'ui.router',
        'ngMaterial',
        'ngSanitize',
    ]).config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/home/index.html',
        })
        .state('blockchain', {
          url: '/blockchain',
          templateUrl: '/blockchain/blockchain.html',
        })
        .state('pba-index', {
          url: '/pba-index',
          templateUrl: '/pba-index/pba-index.html',
          controller: 'pba-index-controller'
        })
        .state('create-gbs', {
          url: '/create-gbs',
          templateUrl: '/create-gbs/create-gbs.html',
          controller: 'create-gbs-controller'
        })
        .state('owner-index', {
          url: '/owner-index',
          templateUrl: '/owner-index/owner-index.html',
          controller: 'owner-index-controller'
        })
        .state('owners', {
          url: '/owners/:ownerId',
          templateUrl: 'owner-detail/owner-detail.html',
          controller: 'owner-detail-controller',
        })
        .state('pbas', {
          url: '/pbas/:pbaId/name/:pbaName',
          params: {
            pbaId: "",
            pbaName: ""
          },
          templateUrl: 'pba-detail/pba-detail.html',
          controller: 'pba-detail-controller',
        })
        .state('test', {
          url: '/test',
          templateUrl: '/test/test.html',
        });

    };

})();
