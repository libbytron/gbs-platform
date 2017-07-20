pragma solidity ^0.4.0;

// address at http://52.177.190.91:8545: 0xad14a7532212812df63c4d9abf68a996825144d4

contract CompanyBalance{
    mapping (uint => int) accountBalances;
    
    function changeBalance(uint companyId, int balance){
        accountBalances[companyId] = balance;
    }
    
    function getBalance(uint companyId) constant returns (int){
        return accountBalances[companyId];
    }
    
}