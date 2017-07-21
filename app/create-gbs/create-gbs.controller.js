(function(){
    'use strict';

    angular.module('app')
        .controller('create-gbs-controller', ['$scope', '$elasticsearch', '$blockchain', '$mdDialog', '$state',
        function($scope, $elasticsearch, $blockchain, $mdDialog, $state){

            $scope.formStatus = "Pending";
            $scope.previousBalance;
            $scope.newBalance;

            $scope.date;
            $scope.companyName;
            $scope.pbaId;
            $scope.entitlement;
            $scope.actual;

            $scope.contract;

            this.$onInit = function() {
            }

            $scope.submit = function(){
                $mdDialog.show({
                    templateUrl: '/create-gbs/loading-contract-dialog.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:false,
                });
                $elasticsearch.getContractFromPbaAndCompany($scope.companyName, $scope.pbaId).then(function(contract){
                        $scope.contract = contract;
                        $blockchain.getBalance($scope.contract.company.id).then(function(balance){
                            $scope.previousBalance = balance;
                            $scope.$apply();
                            $blockchain.createAllocation(
                                $scope.contract.id,
                                $scope.entitlement, 
                                $scope.actual, 
                                $scope.date, 
                                balance
                            ).then(function(result){
                                console.log(result);
                            })

                        })
                    }
                )                
            }

            // new
            $scope.$on('blockchain:newAllocation', function(event,allocationAddress){
                $mdDialog.show({
                    templateUrl: '/create-gbs/loading-balance-dialog.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:false,
                });
                $scope.recordAllocationInDatabase(allocationAddress);
                $blockchain.getAllocation(allocationAddress)
                    .then(function(allocation){
                        console.log(allocation);
                        $blockchain.changeBalance($scope.contract.company.id, allocation.currentBalance).then(
                            function(newBalance){
                                console.log(newBalance);
                                $scope.formStatus = "Submitted";
                                $scope.newBalance = newBalance;
                                $scope.$apply();
                            }
                        )
                    })             
            });

            // new
            $scope.$on('blockchain:balanceChanged', function(event) {
                console.log("notifyNewEntryCalled");
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('GBS entry has been submitted.')
                        .textContent('Add another entry?')
                        .ariaLabel('Submission Alert')
                        .ok('OK')
                    ).then(function(result){
                        $state.go($state.current.name, {}, {reload: true})
                    })
            });
            
            $scope.recordAllocationInDatabase = function(allocationAddress){
                $blockchain.getAllocation(allocationAddress).then(
                    function(allocation){
                        var allocationEntry = {
                            address: allocationAddress,
                            pbaId: $scope.pbaId,
                            date: allocation.date
                        }
                        $elasticsearch.addAllocationEntry(allocationEntry);
                    })
            }


        }]);
})();
