(function(){
    'use strict';

    angular.module('app')
        .controller('testController', ['$scope', '$survey', '$elasticsearch', '$blockchain', '$mdDialog', '$state',
        function($scope, $survey, $elasticsearch, $blockchain, $mdDialog, $state){


            // Language selection tools:
            $scope.contactList = [];
         


            // BLOCKCHAIN:

            // from the user (submit())
            $scope.companyId;
            $scope.pbaId;
            $scope.entitlement;
            $scope.actual;
            $scope.date;

            // need to create allocation (addAllocation())
            $scope.contractId;
            // $scope.entitlement
            // $scope.actual
            // $scope.date
            $scope.previousBalance;

            // need to get the NEW current balance from the allocation // goes to notify....
            $scope.address;


            $scope.balance;

            // daniela and controller form
            this.$onInit = function() {
                $blockchain.subscribe(this);
            }


            $scope.anAllocationAddress;
            $scope.anAllocation;
            $scope.getAnAllocation = function(){
                $blockchain.getAllocation($scope.anAllocationAddress)
                    .then(function(allocation){
                        $scope.anAllocation = allocation;
                        $scope.$apply();
                })

            }

            this.notifyNewAllocation = function(allocationAddress){
                $blockchain.getAllocation(allocationAddress)
                    .then(function(allocation){
                        console.log(allocation);
                        // only controller form does this
                        $blockchain.changeBalance(allocation.contractId, allocation.currentBalance);
                    })
            }

            $scope.addAllocation = function(){
               $blockchain.createAllocation(
                    $scope.contractId, 
                    $scope.entitlement, 
                    $scope.actual, 
                    $scope.date, 
                    $scope.previousBalance
                ).then(function(result){
                    $scope.address = result;
                    console.log($scope.address);
                })
            }

            $scope.getAllocation = function(){
                $blockchain.getAllocation($scope.address)
                    .then(function(allocation){
                        console.log(allocation);
                    })
            }

            // extra

            $scope.setABunchOfCompanyBalances = function(){
                for(var i = 0; i <= 86; i++){
                    $blockchain.changeBalance(i, 9000000);
                }
            }

            $scope.getBalance = function(){
                $blockchain.getBalance($scope.companyId);
            }

            $scope.setBalance = function(){
                $blockchain.changeBalance($scope.companyId, $scope.balance);
            }

            // ELASTICSEARCH:
            $scope.getContractFromPbaAndCompany= function(){
                var companyName = "Blacksands Pacific";
                var pbaId = "PAL006044";
                $elasticsearch.getContractFromPbaAndCompany(companyName, pbaId).then(
                    function(result){
                        console.log(result);
                    }
                )
            }


            $scope.getCompanyIdFromContract = function(){
                var contractId = 19;
                $elasticsearch.getCompanyIdFromContract(contractId).then(
                    function(result){
                        console.log(result);
                    }
                )
            }

             $scope.getCompanyIdFromContract = function(){
                var contractId = 19;
                $elasticsearch.getCompanyIdFromContract(contractId).then(
                    function(result){
                        console.log(result);
                    }
                )
            }

            $scope.addContact = function(){
                var contact = {"name":"Papageno Simoneschi","email":"psimoneschi1@wunderground.com","telephone":"33-(856)940-7383"};
                $elasticsearch.addContact(contact);
            }

            $scope.getAllContacts = function(){
                 console.log('Getting all contacts...');
                 return $elasticsearch.getAllContacts().then(
                     function(hits){
                        for(var i = 0; i < hits.length; i++)
                        {
                            console.log(hits[i]);
                        }
                        return hits;
                     }
                 )
            }

            $scope.addAddress = function(){
                var address = {"street":"11890 Harper Terrace","city":"Bakersfield","state":"California","zip":"93311","country":"United States"};
                $elasticsearch.addAddress(address);
            }

            $scope.getAllAddresses = function(){
                 console.log('Getting all contacts...');
                 $elasticsearch.getAllAddresses().then(
                     function(hits){
                         for(var i = 0; i < hits.length; i++)
                            {
                                console.log(hits[i]);
                            }
                     }
                 )
            }
            
            $scope.addCompany = function(){
                var company = {"id":1,"name":"Anadarko Petroleum","abbreviation":"ANA","contact":{"name":"Hershel Sandbrook","email":"hsandbrook0@abc.net.au","telephone":"351-(233)528-2350"},"address":{"street":"11890 Harper Terrace","city":"Bakersfield","state":"California","zip":93311,"country":"United States"}};
                $elasticsearch.addCompany(company);
            }

            $scope.getAllCompanies = function(){

                 $elasticsearch.getAllCompanies().then(
                     function(hits){
                         for(var i = 0; i < hits.length; i++)
                            {
                                console.log(hits[i]);
                            }
                     }
                 )
            }

            $scope.addPBA = function(){
                var PBAs = {};
                $elasticsearch.addPBA(PBAs[i]);
            }

            $scope.getAllPBAs = function(){

                 $elasticsearch.getAllPBAs().then(
                     function(hits){
                         for(var i = 0; i < hits.length; i++)
                            {
                                console.log(hits[i]);
                            }
                     }
                 )
            }

            $scope.addContract = function(){
                var contract = {};
                $elasticsearch.addContract(contract[i]);
            }

            $scope.getAllContracts = function(){

                 $elasticsearch.getAllContracts().then(
                     function(hits){
                         for(var i = 0; i < hits.length; i++)
                            {
                                console.log(hits[i]);
                            }
                     }
                 )
            }

            $scope.addGasCollection = function(){
                var collection = {};
                $elasticsearch.addGasCollection(collection);
            }

            $scope.getAllGasCollections = function(){

                 $elasticsearch.getAllGasCollections().then(
                     function(hits){
                         for(var i = 0; i < hits.length; i++)
                            {
                                console.log(hits[i]);
                            }
                     }
                 )
            }

            // random

            $scope.submit = function(){
                console.log('Submitting a survey response...');

                var surveyResponse = {
                    name: $scope.name,
                }


                $survey.submitSurveyResponse(surveyResponse);
            }

            $scope.showDialog = function(){
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('This is an alert title')
                        .textContent('You can specify some description text in here.')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                    );
                $state.go($state.current.name, {}, {reload: true})
            }

        }]);
})();