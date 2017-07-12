(function(){
    'use strict';

    angular.module('app')
        .controller('pba-detail-controller', ['$scope', '$elasticsearch', '$stateParams',
        function($scope, $elasticsearch, $stateParams){

            $scope.pbaId = $stateParams.pbaId;
            $scope.pbaName = $stateParams.pbaName;

            $scope.pba = {};
            $scope.owner = {};

            $scope.gbs = [];

            this.$onInit = function() {
                $elasticsearch.getPBAbyNameAndId($scope.pbaId, $scope.pbaName).then(
                     function(hit){
                         $scope.pba = hit;
                         console.log(hit);
                     }
                )
                /*
                $elasticsearch.getPBAsBelongingToCompany($scope.ownerId).then(
                     function(hits){
                         for(var i = 0; i < hits.length; i++)
                            $scope.pbaList.push(hits[i]);
                     }
                )*/
            }


        }]);
})();