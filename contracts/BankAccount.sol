pragma solidity ^0.4.0;

// LOCAL ADDRESS: 0xae4e895700b2199ed539274e2f34a06730387e00

// ADDRESS: 0x3f6dbc28dbed60383b0850e7090726264f6b898f

contract BankAccount {
    int balance;
    
    function BankAccount() public{
        balance = 0;
    }
    
    /* main function */
    function getBalance() public constant returns (int) {
        return balance;
    }
    
    function set(int b){
        balance = b;
    }
    
    function increaseBalance(int x){
        balance += x;
    }
    
    function decreaseBalance(int x){
        balance -= x;
    }
}