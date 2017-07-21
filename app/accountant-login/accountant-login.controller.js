(function(){
    'use strict';

    angular.module('app')
        .controller('accountant-login-controller', ['$scope', '$state',
        function($scope, $state){
            $scope.email;
            $scope.password;

            $scope.submitLogin = function(){
                console.log("submit was called");
                /*
                if($scope.email === 'accountant@exxonmobil.com')
                    $state.go('create-gbs');
                else
                    $state.go('pba-index');*/
            }


        }]);
})();