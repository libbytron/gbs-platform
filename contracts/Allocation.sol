pragma solidity ^0.4.0;

// remote address at http://52.177.190.91:8545: 0xc73072494c4d7289c2d9b2acf9febe41229cb4f9

contract Allocation{
    uint contractId;
    int entitlement;
    int actual;
    int overshort;
    string date;
    int previousBalance;
    int currentBalance;
    
    
    function Allocation(uint cId, int ent, int act, string day, int prev){
        contractId = cId;
        entitlement = ent;
        actual = act;
        overshort = ent - act;
        date = day;
        previousBalance = prev;
        currentBalance = prev + ent - act;
    }
    
    function getAllocation() constant returns (uint, int, int, int, string, int, int){
        return(contractId,
            entitlement,
            actual,
            overshort,
            date,
            previousBalance,
            currentBalance);
    }
}