;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReportsController', ReportsController);

    ReportsController.$inject = ['$state', 'issues', 'commits', '$stateParams', 'http'];

    function ReportsController($state, issues, commits, $stateParams, http) {

        var vm = this;
        /**The logic for receiving data for the reports is in the file
         * app/core/app.ui.router.js in "resolve" block of "reports" state
         * */

        /** Visibility control block for checkboxes of report options*/
        vm.checkBox = {
            commits: {
                committer: true,
                date: true,
                description: true
            },
            issues: {
                name: true,
                user: true,
                date: true,
                status: true
            }
        };
        vm.commits = commits.data;
        vm.commitsSortParam = 'commit.author.name';
        vm.goToRepos = goToRepos;
        vm.issues = issues.data;
        vm.issuesSortParam = 'title';
        vm.logOut = logOut;
        vm.makeInvisible = makeInvisible;
        vm.repoName = $stateParams.repoName;

        /**Function for transition to repositories page*/
        function goToRepos() {
            var params = {
                userName: $stateParams.userName,
                basic: $stateParams.basic,
                id: $stateParams.id,
                token: $stateParams.token
            };
            console.log('Go back to repositories.');
            $state.go('repositories', params);
        }

        /**Function for log out*/
        function logOut() {
            http.deleteAuthorization($stateParams.basic, $stateParams.id)
                .then(function (res) {
                    console.log(res);
                    $state.go('login');
                })
        }

        /**Function for toggling visibility of report parts*/
        function makeInvisible(value) {
            return value ? 'visible' : 'invisible';
        }


    }
})();