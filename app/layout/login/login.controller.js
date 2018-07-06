;(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$timeout', 'http', '$base64'];

    function LoginController($state, $timeout, http, $base64) {

        var vm = this;

        vm.user = {};
        vm.login = login;
        vm.showMessage = showMessage;
        vm.checkArray = checkArray;
        vm.note = 'Sing-on app by MyrPasko';

        /** Function for looping through array for comparing data */
        function checkArray(array, compare) {
            var id = -1;
            array.forEach(function (value) {
                if (value.note === compare) {
                    id = value.id;
                }
            });
            console.log(id);
            return id;
        }

        /** Submit function for user authorization and receiving token */
        function login() {
            /** There are 4 steps to take OAuth token:
             * 1. Encoding the form data to create basic credentials for
             * authorization requests.
             * 2. Taking list of authorizations (we can not take token from there,
             * because it equals "").
             * 3. Looping through authorizations list to compare vm.note and
             * "note" field of every item. If they are equals, we delete that
             * authorization by id.
             * 4. Creating new authorization with vm.note in body of POST request,
             * and now we finally have token to access GitHub API.
             *
             * Taking access token is possible only after creating new
             * authorization.
             * */

            /** Step 1. Encoding form data to base64. */
            var encodedCredentials = $base64.encode(vm.user.login + ':' + vm.user.password);
            var basic = 'basic ' + encodedCredentials;

            console.log(basic);
            if (vm.form.$invalid) {
                return;
            }

            /** Step 2. Taking list of authorizations */
            http.getAuthorization(basic)
                .then(function (res) {
                    /** Step 3. Looping through authorizations list */
                    var id = vm.checkArray(res.data, vm.note);
                    console.log(id);
                    console.log(res.data);
                    return id;
                }, function (error) {
                    console.error(error);
                    vm.showMessage('Wrong login or password.')
                })
                /** Step 3. Deleting authorization (if authorization is already
                 *  exists) */
                .then(function (id) {
                    return http.deleteAuthorization(basic, id)
                })
                /** Step 4. Creating new authorization and taking token */
                .then(function () {
                    return http.postAuthorization(basic, vm.note)
                })
                .then(function (res) {
                    console.log(res);
                    console.log('Go to repositories.');
                    /** All data move between states programmaticaly
                     *  without saving it in local storage */
                    $state.go('repositories', {
                        "basic": basic,
                        "id": res.data.id,
                        "token": "token " + res.data.token
                    });
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        /** Function shows alert messages */
        function showMessage(message) {
            vm.message = message;
            $timeout(function () {
                vm.message = '';
            }, 5000);
        }
    }
})();