(function(){
    'use strict';

    angular.module('app')
        .controller('pba-detail-controller', ['$scope', '$elasticsearch', '$stateParams', '$blockchain', '$state', '$rootScope',
        function($scope, $elasticsearch, $stateParams, $blockchain, $state, $rootScope){

            $scope.pbaId = $stateParams.pbaId;
            $scope.pbaName = $stateParams.pbaName;

            $scope.pba = {};
            $scope.owner = {};
            $scope.contractList = [];

            $scope.allocation;
            $scope.gbs = [];
            $scope.numberOfAllocations = 0;
            $scope.numberOfAllocationsAdded = 0;

            this.$onInit = function() {
                $elasticsearch.getPBAbyNameAndId($scope.pbaId, $scope.pbaName).then(
                     function(hit){
                         $scope.pba = hit;
                     }
                )
                $elasticsearch.getContractsBelongingToPba($scope.pbaId).then(
                     function(hits){
                         for(var i = 0; i < hits.length; i++)
                            $scope.contractList.push(hits[i]);
                     }
                )
                $elasticsearch.getAllocationsBelongingToPBA($scope.pbaId).then(
                    function(hits){
                        $scope.numberOfAllocations = hits.length;
                        for(var i = 0; i < hits.length; i++){
                            $scope.getAllocation(hits[i]);
                        }
                    }
                )
            }

            // new
            $rootScope.$on('blockchain:balanceChanged', function(event) {
                $state.go($state.current.name, {}, {reload: true});
            });

            $scope.getAllocation = function(allocationInfo){
                $blockchain.getAllocation(allocationInfo.address).then(
                    function(allocation){
                        $scope.addAllocationToGBS(allocation);
                    }
                )
            }

            $scope.addAllocationToGBS = function(allocation){
                $elasticsearch.getContractById(allocation.contractId).then(
                    function(contract){
                        var gbsEntry = {
                            companyId: contract.company.id,
                            companyName: contract.company.name,
                            pbaId: contract.pba.id,
                            entitlement: allocation.entitlement,
                            actual: allocation.actual,
                            overshort: allocation.overshort,
                            dateAsString: allocation.date,
                            date: new Date(allocation.date),
                            previousBalance: allocation.previousBalance,
                            currentBalance: allocation.currentBalance
                        }
                        $scope.gbs.push(gbsEntry);
                        $scope.numberOfAllocationsAdded++;
                        if($scope.numberOfAllocationsAdded == $scope.numberOfAllocations){
                            $scope.gbs.sort(function(a,b){
                                if(a.companyId == b.companyId)
                                    return b.date - a.date;
                                return a.companyId-b.companyId;    
                            });
                            /*
                            $scope.gbs.sort(function(a,b){
                                    return b.date - a.date;
                            })*/
                            
                        }
                    }
                )(allocation)

            }

            $scope.deleteAllocationEntry = function(pbaId, date){
                $elasticsearch.deleteAllocationEntry(pbaId, date).then(
                    function(result){
                        setTimeout(function(){
                            $state.go($state.current.name, {}, {reload: true});
                        }, 1000);
                    }
                )
            }



        }]);
})();