(function(){
    'use strict';

    angular
        .module('app')
        .service('$blockchain', blockchainService);

    blockchainService.$inject = ['$http'];

    function blockchainService($http){

        var subscribers = [];
        var greeting = {
                response: 'no response'
            }

        // list of service functions:
        var exports = {
            requestMessage: requestMessage,
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            getMessage: getMessage
        };

        return exports;

        // service functions:
        function requestMessage(){
            $http.get('/message').then(
                function successCallback(data){
                    console.log(data.data);
                    greeting = data.data;
                    console.log(greeting.response);
                    notifyAll();
                });  
        }

        function getMessage(){
            return greeting.response;
        }

        function subscribe(subscriber){
            subscribers.push(subscriber);
        }

        function unsubscribe(subscriber){
            var indexToRemove = subscribers.indexOf(subscriber);
            if(index > -1){
                subscribers.splice(indexToRemove, 1);
            }
        }

        function notifyAll(){
            subscribers.forEach(function(subscriber){
                subscriber.notify();
            });
        }
    }

})();