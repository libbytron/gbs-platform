(function() {
    'use strict';

    angular.module('app', [
        'ui.router',
        'ngMaterial',
        'ngSanitize',
    ]).config(function($mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('blue',{
                'default': '900'})
            .accentPalette('pink',{
                'default': '700'})
    })

})();



