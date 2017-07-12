(function(){
    'use strict';

    angular.module('app')
        .controller('owner-index-controller', ['$scope', '$elasticsearch',
        function($scope, $elasticsearch){

            $scope.companyList = [];
            $scope.searchKey = "";

            this.$onInit = function() {
                $scope.getAllOwners().then(
                    function(hits){
                        for(var i = 0; i < hits.length; i++)
                            $scope.companyList.push(hits[i]);
                    }
                )
            }

            $scope.getAllOwners = function(){
                 return $elasticsearch.getAllCompanies().then(
                     function(hits){
                         return hits;
                     }
                 )
            }


            $scope.search = function(event){
                if(event.key === "Enter"){
                    $elasticsearch.generalCompanySearch($scope.searchKey).then(
                        function(hits){
                            $scope.companyList = hits;
                        }
                    )
                }
            }

        }]);
})();