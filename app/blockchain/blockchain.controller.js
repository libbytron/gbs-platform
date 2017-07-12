(function(){
    'use strict';

    angular.module('app')
        .controller('blockchainController', ['$scope', '$blockchain',
        function($scope, $blockchain){

            $scope.blockchainMessage = '';

            this.$onInit = function(){
                $blockchain.subscribe(this);
            }

            
            this.notify = function(){
                console.log("notify was called!");
                $scope.blockchainMessage = $blockchain.getMessage();
            }
            

            // Language selection tools:
            $scope.getMessage = function() {
                $blockchain.requestMessage();
            }


        }]);
})();