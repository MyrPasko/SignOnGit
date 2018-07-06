;(function () {
    'use strict';

    angular
        .module('app')
        .factory('http', http);

    http.$inject = ['$http'];

    function http($http) {
        var basicUrl = 'https://api.github.com';

        /** Request for getting list of user authorizations. */
        var getAuthorization = function (string) {
            var url = basicUrl + '/authorizations';
            var config = {
                method: 'GET',
                headers: {
                    'Authorization': string,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            };
            return $http.get(url, config);
        };

        /** Request for deleting authorization by Id. */
        var deleteAuthorization = function (string, id) {
            var url = basicUrl + '/authorizations/' + id;
            var config = {
                method: 'DELETE',
                headers: {
                    'Authorization': string,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            };
            if (id !== -1) {
                return $http.delete(url, config);
            } else {
                return;
            }
        };

        /** Request for creating new authorization. New access token will
         * appear in response. */
        var postAuthorization = function (string, note) {
            var url = basicUrl + '/authorizations';
            var data = {
                "scopes": [
                    "public_repo"
                ],
                "note": note
            };
            var config = {
                method: 'POST',
                headers: {
                    'Authorization': string,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            };
            return $http.post(url, data, config);
        };

        /** Request for getting repositories by user name. */
        var getRepoByUserName = function (user, token) {
            var url = basicUrl + '/users/' + user + '/repos';
            var config = {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                params: {
                    'type': 'all',
                    'per_page': '200'
                }
            };
            return $http.get(url, config);
        };

        /** Request for getting commits of chosen repository by it's name. */
        var getCommitsByRepoName = function (user, repoName, token) {
            var url = basicUrl + '/repos/' + user + '/' + repoName + '/commits';
            var config = {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                params: {
                    'per_page': '200'
                }
            };
            return $http.get(url, config);
        };

        /** Request for getting issues of chosen repository by it's name. */
        var getIssuesByRepoName = function (user, repoName, token) {
            var url = basicUrl + '/repos/' + user + '/' + repoName + '/issues';
            var config = {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            };
            return $http.get(url, config);
        };

        return {
            getRepoByUserName: getRepoByUserName,
            getCommitsByRepoName: getCommitsByRepoName,
            getIssuesByRepoName: getIssuesByRepoName,
            getAuthorization: getAuthorization,
            deleteAuthorization: deleteAuthorization,
            postAuthorization: postAuthorization
        }
    }
})();