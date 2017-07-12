(function(){
    'use strict';

    angular.module('app')
        .controller('navagation-bar-controller', ['$scope', '$elasticsearch', 
        function($scope, $elasticsearch){

            $scope.test = 'test';

            this.$onInit = function() {
            }


        }]);
})();