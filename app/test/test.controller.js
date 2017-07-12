(function(){
    'use strict';

    angular.module('app')
        .controller('testController', ['$scope', '$survey', '$elasticsearch',
        function($scope, $survey, $elasticsearch){

            // Language selection tools:
            $scope.myFavLanguage = 'None';
            $scope.contactList = [];

            this.$onInit = function() {
                $scope.getAllContacts().then(
                    function(hits){
                        for(var i = 0; i < hits.length; i++)
                        {
                            $scope.contactList.push(hits[i]);
                        }
                    }
                )
            }

            $scope.php = function(){
                $scope.myFavLanguage = 'PHP';
            };

            $scope.javascript = function(){
                $scope.myFavLanguage = 'JavaScript';
            };

            $scope.cpp = function(){
                $scope.myFavLanguage = 'C++';
            };

            $scope.java = function(){
                $scope.myFavLanguage = 'Java';
            };


            

            $scope.submit = function(){
                console.log('Submitting a survey response...');

                var surveyResponse = {
                    name: $scope.name,
                    favoriteLanguage: $scope.myFavLanguage
                }


                $survey.submitSurveyResponse(surveyResponse);

                //$responseService.submitResponse(surveyResponse);
                //.then() { $state.go ... }
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

        }]);
})();