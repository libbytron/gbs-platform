(function(){
    'use strict';

    angular.module('app')
        .controller('owner-detail-controller', ['$scope', '$elasticsearch', '$stateParams',
        function($scope, $elasticsearch, $stateParams){

            $scope.ownerId = $stateParams.ownerId;

            $scope.owner = {};

            $scope.pbaList = [];
            $scope.contractList = [];

            this.$onInit = function() {
                $elasticsearch.getCompanyById($scope.ownerId).then(
                     function(hit){
                         $scope.owner = hit;
                     }
                )
                $elasticsearch.getPBAsBelongingToCompany($scope.ownerId).then(
                     function(hits){
                         console.log("Here is a stupid test");
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
            }




        }]);
})();