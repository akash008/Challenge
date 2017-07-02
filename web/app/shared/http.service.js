/**
 * Http Service Handlers
 **/
'use strict';
angular.module('FoghornApp').service('HttpServiceHandler', ['$http', function($http) {
    /**
     * Generic GET AJAX Call handler
     * */
    this.doGet = function(url, cbHttpFun) {
        $http({
            method: 'GET',
            url: url
        }).then(function(success) {
            // this callback will be called asynchronously
            // when the response is available
            return cbHttpFun(success.data, null, success.status, success.headers);
        }, function(error) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            return cbHttpFun(null, error.data, error.status, error.headers);
        });
    };
    /**
     * Generic POST AJAX Call handler
     * */
    this.doPost = function(url, requestData, cbHttpFun) {
        $http({
            method: 'POST',
            url: url,
            data: requestData
        }).then(function(success) {
            // this callback will be called asynchronously
            // when the response is available
            return cbHttpFun(success.data, null, success.status, success.headers);
        }, function(error) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            return cbHttpFun(null, error.data, error.status, error.headers);
        });
    };
}]);