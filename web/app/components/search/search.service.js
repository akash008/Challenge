/**
 * @ngdoc service
 * @name FoghornApp.service:SearchService
 *
 * @description
 * This service for search githut user and create gist data. 
 */
angular.module('FoghornApp').service('SearchService', ['HttpServiceHandler', function(HttpServiceHandler) {
    /**
     * @ngdoc method
     * @name getSearchedResult
     * @methodOf FoghornApp.service:SearchService
     * @description
     * This method will return the list of users
     *
     * @param {String=} userName  search query
     * @param {Number=} pageNo   current page number and default is 0
     * @param {Number=} perPageNo number of users per page and default is 5
     * @param {function=} callback  callback
     * @returns {Array} List of Users
     */
    this.getSearchedResult = function(userName, pageNo, perPageNo, callback) {
        var url = apiURL.getValue('githubBaseURL') + apiURL.getValue('searchUser') + userName + '&page=' + pageNo + '&per_page=' + perPageNo;
        HttpServiceHandler.doGet(url, function(response, error, status) {
            if (response || status == 200) {
                return callback(response, null, status);
            } else {
                return callback(null, error, status);
            }
        });
    };
    /**
     * @ngdoc method
     * @name addGistData
     * @methodOf FoghornApp.service:SearchService
     * @description
     * This method will create gist data.
     *
     * @param {Object=} requestData  It contains description and content params.
     * @param {function=} callback  callback
     * @returns {Object} Created Gist Data object
     */
    this.addGistData = function(requestData, callback) {
        var url = apiURL.getValue('githubBaseURL') + apiURL.getValue('gistData');
        HttpServiceHandler.doPost(url, requestData, function(response, error, status) {
            if (response || status == 200) {
                return callback(response, null, status);
            } else {
                return callback(null, error, status);
            }
        });
    };
    /**
     * @ngdoc method
     * @name getGistData
     * @methodOf FoghornApp.service:SearchService
     * @description
     * This method will fetch Gist data of respective gistID.
     *
     * @param {Number=} gistID  Gist ID
     * @param {function=} callback  callback
     * @returns {Object} Gist Details
     */
    this.getGistData = function(gistID, callback) {
        var url = apiURL.getValue('githubBaseURL') + apiURL.getValue('gistData') + '/' + gistID;
        HttpServiceHandler.doGet(url, function(response, error, status) {
            if (response || status == 200) {
                return callback(response, null, status);
            } else {
                return callback(null, error, status);
            }
        });
    };
}]);