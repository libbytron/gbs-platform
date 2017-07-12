(function(){
    'use strict';

    angular.module('app')
        .controller('footer-controller', ['$scope', '$elasticsearch', 
        function($scope, $elasticsearch){

            $scope.test = 'test';

            this.$onInit = function() {
            }


        }]);
})();