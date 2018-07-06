;(function () {
    'use strict';

    angular
        .module("app", [
            'ui.router',
            'ngMaterial',
            'base64'
        ])

        .run(block);

    function block() {
        console.log('App is running.');
    }

})();