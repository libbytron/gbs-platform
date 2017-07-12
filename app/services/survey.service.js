(function(){
    'use strict';

    angular
        .module('app')
        .service('$survey', surveyService);

    surveyService.$inject = ['$http'];

    function surveyService($http){
        // list of service functions:
        var exports = {
            submitSurveyResponse: submitSurveyResponse
        };

        return exports;

        // service functions:
        function submitSurveyResponse(surveyResponse){
            $http.post('/response/submit', surveyResponse).then(
                function successCallback(data){
                    console.log(data);
                });
        }
    }

})();