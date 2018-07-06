;(function () {
    'use strict';

    angular
        .module('app')
        .controller('RepositoriesController', RepositoriesController);

    RepositoriesController.$inject = ['$state', 'http', 'userRepos', '$stateParams', '$timeout'];

    function RepositoriesController($state, http, userRepos, $stateParams, $timeout) {

        var vm = this;

        vm.chooseRepo = chooseRepo;
        vm.getRepos = getRepos;
        vm.listOfRepos = userRepos.data || '';
        vm.logOut = logOut;
        vm.searchField = '';
        vm.showMessage = showMessage;
        vm.sortparam = 'name';
        vm.userName = $stateParams.userName || '';

        /**Function for choosing repository*/
        function chooseRepo(obj) {
            var params = {
                userName: obj.owner.login,
                repoName: obj.name,
                basic: $stateParams.basic,
                id: $stateParams.id,
                token: $stateParams.token
            };
            console.log('Go to reports');
            $state.go('reports', params);
        }

        /**Function for getting repositories by user name*/
        function getRepos() {
            http.getRepoByUserName(vm.searchField, $stateParams.token)
                .then(function (res) {
                    vm.listOfRepos = res.data;
                    vm.userName = vm.searchField;
                    vm.searchField = '';
                }, function (error) {
                    console.log(error);
                    vm.listOfRepos = '';
                    vm.showMessage('User was not found.');
                })
        }

        /**Function for log out*/
        function logOut() {
            http.deleteAuthorization($stateParams.basic, $stateParams.id)
                .then(function (res) {
                    console.log(res);
                    $state.go('login');
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