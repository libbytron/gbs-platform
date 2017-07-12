(function(){
    'use strict';

    angular.module('app')
        .controller('pba-index-controller', ['$scope', '$elasticsearch',
        function($scope, $elasticsearch){

            $scope.pbaList = [];

            $scope.searchKey = "";

            this.$onInit = function() {
                $scope.getAllPBAs().then(
                    function(hits){
                        for(var i = 0; i < hits.length; i++)
                            $scope.pbaList.push(hits[i]);
                    }
                )
            }

            $scope.getAllPBAs = function(){
                 return $elasticsearch.getAllPBAs().then(
                     function(hits){
                         return hits;
                     }
                 )
            }

            $scope.search = function(event){
                if(event.key === "Enter"){
                    $elasticsearch.generalPBAsearch($scope.searchKey).then(
                        function(hits){
                            $scope.pbaList = hits;
                        }
                    )
                }
            }


        }]);
})();