(function(){
    'use strict';

    angular.module('app')
        .controller('owner-detail-controller', ['$scope', '$elasticsearch', '$stateParams', '$blockchain',
        function($scope, $elasticsearch, $stateParams, $blockchain){

            $scope.ownerId = $stateParams.ownerId;

            $scope.owner = {};

            $scope.pbaList = [];
            $scope.contractList = [];

            $scope.balance = 0;

            this.$onInit = function() {
                $elasticsearch.getCompanyById($scope.ownerId).then(
                     function(hit){
                         $scope.owner = hit;
                     }
                )
                $elasticsearch.getPBAsBelongingToCompany($scope.ownerId).then(
                     function(hits){
                         for(var i = 0; i < hits.length; i++)
                            $scope.pbaList.push(hits[i]);
                     }
                )
                $elasticsearch.getContractsBelongingToCompany($scope.ownerId).then(
                     function(hits){
                         for(var i = 0; i < hits.length; i++)
                            $scope.contractList.push(hits[i]);
                     }
                )
                $blockchain.getBalance($scope.ownerId).then(
                    function(result){
                        $scope.balance = result;
                        $scope.$apply();
                    }
                )
            }




        }]);
})();