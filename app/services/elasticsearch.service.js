(function(){
    'use strict';

    var elasticsearchURL = 'https://search-gbs-data-search-nhg5tgjby6zntvqcmixiaxssuy.us-east-1.es.amazonaws.com';

    angular
        .module('app')
        .service('$elasticsearch', elasticsearchService);

    elasticsearchService.$inject = ['$http'];

    function elasticsearchService($http){
        // list of service functions:
        var exports = {
            addContact: addContact,
            getAllContacts: getAllContacts,
            addAddress: addAddress,
            getAllAddresses: getAllAddresses,
            addCompany: addCompany,
            getAllCompanies: getAllCompanies,
            generalCompanySearch: generalCompanySearch,
            getCompanyById: getCompanyById,
            addPBA: addPBA,
            getAllPBAs: getAllPBAs,
            generalPBAsearch: generalPBAsearch,
            getPBAsBelongingToCompany: getPBAsBelongingToCompany,
            getPBAbyNameAndId: getPBAbyNameAndId,
            addContract: addContract,
            getAllContracts: getAllContracts,
            getContractsBelongingToCompany: getContractsBelongingToCompany,
            addGasCollection: addGasCollection,
            getAllGasCollections: getAllGasCollections,
        };

        return exports;

        function convertHitsToSource(hits){
            var convertedHits = [];
            for(var i = 0; i < hits.length; i++)
                convertedHits.push(hits[i]._source);
            return convertedHits;
        }

        // service functions:
        function addContact(contact){
            $http.post(elasticsearchURL + '/contacts/contact', contact).then(
                function successCallback(data){
                    console.log(data);
                });
        }

        function getAllContacts(){
            return $http.get(elasticsearchURL + '/contacts/contact/_search?size=100').then(
                function successCallback(response){
                    return convertHitsToSource(response.data.hits.hits);
                });
        }

        function addAddress(address){
            $http.post(elasticsearchURL + '/addresses/address', address).then(
                function successCallback(data){
                    console.log(data);
                });
        }

        function getAllAddresses(){
            return $http.get(elasticsearchURL + '/addresses/address/_search?size=100').then(
                function successCallback(response){
                    return convertHitsToSource(response.data.hits.hits);
                });
        }

        function addCompany(company){
            $http.post(elasticsearchURL + '/companies/company', company).then(
                function successCallback(data){
                    console.log(data);
                });
        }

        function getAllCompanies(){
            return $http.get(elasticsearchURL + '/companies/company/_search?size=100').then(
                function successCallback(response){
                    return convertHitsToSource(response.data.hits.hits);
                });
        }

        function generalCompanySearch(searchKey){
            var searchQuery = {
                "query": {
                    "simple_query_string" : {
                        "query": searchKey
                    }
                }
            }
            return $http.post(elasticsearchURL + '/companies/company/_search', searchQuery).then(
                function successCallback(response){
                    return convertHitsToSource(response.data.hits.hits);
            });
        }

        function getCompanyById(companyId){
            var searchQuery = {
                query: {
                    match: {
                        id: companyId
                    }
                }
            }
            return $http.post(elasticsearchURL + '/companies/company/_search', searchQuery).then(
                function successCallback(response){
                    console.log(response.data.hits.hits[0]._source);
                    return response.data.hits.hits[0]._source;
            });
        }

        function addPBA(pba){
            $http.post(elasticsearchURL + '/pbas/pba', pba).then(
                function successCallback(data){
                    console.log(data);
                });
        }

        function getAllPBAs(){
            return $http.get(elasticsearchURL + '/pbas/pba/_search?size=100').then(
                function successCallback(response){
                    return convertHitsToSource(response.data.hits.hits);
                });
        }

        function generalPBAsearch(searchKey){
            var searchQuery = {
                "query": {
                    "simple_query_string" : {
                        "query": searchKey
                    }
                }
            }
            return $http.post(elasticsearchURL + '/pbas/pba/_search', searchQuery).then(
                function successCallback(response){
                    return convertHitsToSource(response.data.hits.hits);
            });
        }

        function getPBAsBelongingToCompany(companyId){
            var searchQuery = {
                query: {
                    match: {
                        "company.id": companyId
                    }
                }
            }
            return $http.post(elasticsearchURL + '/pbas/pba/_search', searchQuery).then(
                function successCallback(response){
                    return convertHitsToSource(response.data.hits.hits);
            });
        }

        function getPBAbyNameAndId(pbaId, pbaName){
            var searchQuery = {
            "query" : {
                    "bool": {
                        "must": [
                        {
                            "match_phrase": {
                                "id":pbaId
                            }
                        },
                        {
                            "match_phrase": {
                                "name":pbaName
                            }
                        }
                        ]
                    }
                }
            }
            console.log(searchQuery);
            return $http.post(elasticsearchURL + '/pbas/pba/_search', searchQuery).then(
                function successCallback(response){
                    return response.data.hits.hits[0]._source;
            });
        }

        function addContract(contract){
            $http.post(elasticsearchURL + '/contracts/contract', contract).then(
                function successCallback(data){
                    console.log(data);
                });
        }

        function getAllContracts(){
            return $http.get(elasticsearchURL + '/contracts/contract/_search?size=100').then(
                function successCallback(response){
                    return convertHitsToSource(response.data.hits.hits);
                });
        }

        function addGasCollection(collection){
            $http.post(elasticsearchURL + '/collections/collection', collection).then(
                function successCallback(data){
                    console.log(data);
                });
        }

        function getContractsBelongingToCompany(companyId){
            var searchQuery = {
                query: {
                    match: {
                        "company.id": companyId
                    }
                }
            }
            return $http.post(elasticsearchURL + '/contracts/contract/_search', searchQuery).then(
                function successCallback(response){
                    return convertHitsToSource(response.data.hits.hits);
            });
        }

        function getAllGasCollections(){
            return $http.get(elasticsearchURL + '/collections/collection/_search?size=100').then(
                function successCallback(response){
                    return convertHitsToSource(response.data.hits.hits);
                });
        }
    }

})();