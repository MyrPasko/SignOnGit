;(function () {
    'use strict';

    angular
        .module('app')
        .config(router);

    router.$inject = ['$stateProvider', '$urlRouterProvider'];

    function router($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "layout/login/login.html",
                controller: "LoginController",
                controllerAs: "vm"
            })
            .state("repositories", {
                url: "/repositories",
                templateUrl: "layout/repositories/repositories.html",
                controller: "RepositoriesController",
                controllerAs: "vm",
                params: {
                    userName: null,
                    basic: null,
                    id: null,
                    token: null
                },
                resolve: {
                    /** Receiving data by user name after returning from
                     * "reports" state.
                     * */
                    userRepos: ['$stateParams', 'http', function ($stateParams, http) {
                        if ($stateParams.userName) {
                            return http.getRepoByUserName($stateParams.userName, $stateParams.token);
                        } else {
                            console.log($stateParams);
                            return '';
                        }
                    }]
                }
            })
            .state("reports", {
                url: "/reports",
                templateUrl: "layout/reports/reports.html",
                controller: "ReportsController",
                controllerAs: "vm",
                params: {
                    userName: null,
                    repoName: null,
                    basic: null,
                    id: null,
                    token: null
                },
                resolve: {
                    /** Receiving data for repository had chosen in
                     * "repositories" state
                     * * */
                    issues: ['$stateParams', 'http', function ($stateParams, http) {
                        return http.getIssuesByRepoName($stateParams.userName, $stateParams.repoName, $stateParams.token);
                    }],
                    commits: ['$stateParams', 'http', function ($stateParams, http) {
                        return http.getCommitsByRepoName($stateParams.userName, $stateParams.repoName, $stateParams.token);
                    }]
                }
            })
    }
})();