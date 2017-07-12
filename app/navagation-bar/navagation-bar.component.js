(function() {
  'use strict';

  angular.module('app')
  .directive('navbar', function() {
      return {
          templateUrl: '/navagation-bar/navagation-bar.html',
          controller: 'navagation-bar-controller'
      }
   })

})();