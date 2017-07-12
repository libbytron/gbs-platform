(function() {
  'use strict';

  angular.module('app')
  .directive('emfooter', function() {
      return {
          templateUrl: '/footer/footer.html',
          controller: 'footer-controller'
      }
   })

})();