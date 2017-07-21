(function(){
    'use strict';

    angular
        .module('app')
        .service('$blockchain', blockchainService);

    blockchainService.$inject = ['$http', '$rootScope'];

    function blockchainService($http, $rootScope){

        var coinbaseAddress = "0xa4338dd633877a4a6aaaf28292ecf45f8eb8f94f";
        var companyBalanceContract = $rootScope.CompanyBalanceContract.at("0xad14a7532212812df63c4d9abf68a996825144d4");

        // list of service functions:
        var exports = {
            createAllocation: createAllocation,
            getAllocation: getAllocation,
            getBalance: getBalance,
            changeBalance: changeBalance
        };

        return exports;

        // service functions:
        function createAllocation(contractId, entitlement, actual, date, previousBalance){
            return $rootScope.AllocationContract.new(
                contractId,
                entitlement,
                actual,
                date,
                previousBalance,
                {from: coinbaseAddress, gas: calculateMaxGas(coinbaseAddress)}
            ).then(function(result){
                $rootScope.$emit('blockchain:newAllocation', result.address);
                $rootScope.$broadcast('blockchain:newAllocation', result.address);
                return result.address;
            })
        }

        function getAllocation(allocationAddress){
            return $rootScope.AllocationContract
                .at(allocationAddress)
                .getAllocation()
                .then(function(result){
                    var allocation = {
                        contractId: result[0].toNumber(),
                        entitlement: result[1].toNumber(),
                        actual: result[2].toNumber(),
                        overshort: result[3].toNumber(),
                        date: result[4],
                        previousBalance: result[5].toNumber(),
                        currentBalance: result[6].toNumber()
                    }
                    return allocation;
                });
        }

        function getBalance(companyId){
            return companyBalanceContract.getBalance(companyId).then(function(balance){
                return balance.toNumber();
            });
        }

        function changeBalance(companyId, balance){
            return companyBalanceContract.changeBalance(
                companyId,
                balance,
                {from: coinbaseAddress, gas: calculateMaxGas(coinbaseAddress)}
            ).then(function(result){
                $rootScope.$emit('blockchain:balanceChanged');
                $rootScope.$broadcast('blockchain:balanceChanged');
                return getBalance(companyId);
            })
        }

        function calculateMaxGas(acc) {
            var accBalance = $rootScope.web3.eth.getBalance(acc).toNumber();
            var gasLimit = Math.floor($rootScope.web3.eth.getBlock('latest').gasLimit * 0.95);
            var gasLimitValue = gasLimit * $rootScope.web3.eth.gasPrice;
            if (accBalance >= gasLimitValue) {
                return gasLimit;
            } else {
                return Math.floor((accBalance / $rootScope.web3.eth.gasPrice) * 0.95);
            }
        }
    }

})();