import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'; 
import allocation_contracts from '../build/contracts/Allocation.json';
import company_balance_contracts from '../build/contracts/CompanyBalance.json';

(function() {

  'use strict';

  var app = angular.module('app', [
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

    app.run(function($rootScope){
        $rootScope.web3 = new Web3(new Web3.providers.HttpProvider("http://52.177.190.91:8545"));
        $rootScope.AllocationContract = contract(allocation_contracts);
        $rootScope.AllocationContract.setProvider($rootScope.web3.currentProvider);

        $rootScope.CompanyBalanceContract = contract(company_balance_contracts);
        $rootScope.CompanyBalanceContract.setProvider($rootScope.web3.currentProvider);
    });

})();
