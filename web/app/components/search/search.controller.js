/**
 * @ngdoc controller
 * @name FoghornApp.controller:SearchController
 *
 * @description
 * This is search user controller.
 */
angular.module('FoghornApp').controller('SearchController', ['$scope', '$crypto', '$log', 'SearchService', function($scope, $crypto, $log, SearchService) {
    /**
     * Initialize variables.
     */
    $scope.page = 0;
    $scope.perPage = 5;
    $scope.userList = [];
    $scope.userAndGistMapping = {};
    $scope.errorMessage = null;
    $scope.successMessage = null;
    /**
     * @ngdoc function
     * @name searchInit
     * @description
     * Init functiona- Run on html page load.
     */
    $scope.searchInit = function() {
        if (localStorage.getItem('userAndGistMapping')) {
            var decrypted = localStorage.getItem('userName');
            $scope.userName = $crypto.decrypt(decrypted);
            $scope.page = -1;
        }
    };
    /**
     * @ngdoc function
     * @name searchGitHubUser
     * @description
     * This is a search user method.
     * Search user with github APIs.
     */
    $scope.searchGitHubUser = function() {
        //Encrypted username before saving in localStorage.
        var encrypted = $crypto.encrypt($scope.userName);
        localStorage.setItem('userName', encrypted);
        //Calling service methode.
        SearchService.getSearchedResult($scope.userName, $scope.page, $scope.perPage, function(response, error, status) {
            if (response && response.items) {
                // After successful API call, assigning list of user's.
                $scope.userList = response.items;
                if (localStorage.getItem('userAndGistMapping')) {
                    fetchGistDetails();
                }
            } else {
                $scope.errorMessage = "Something went wrong, Please reload the page or try after some time.";
            }
        });
    };
    /**
     * @ngdoc function
     * @name closeModal
     * @description
     * Close Search Modal on click.
     */
    $scope.closeModal = function() {
        angular.element('#myModalNorm').modal('hide');
    };
    /**
     * @ngdoc function
     * @name addMoreUsers
     * @description
     * Search more user for lazy loading.
     * This method  is call on lazy loading.
     */
    $scope.addMoreUsers = function() {
        //If username is empty then return without any further processing.
        if (!$scope.userName) {
            return;
        }
        //Increasing page number on each call.
        $scope.page++;
        SearchService.getSearchedResult($scope.userName, $scope.page, $scope.perPage, function(response, error, status) {
            if (response && response.items) {
                //Concating old search result with newly search result.
                $scope.userList = $scope.userList.concat(response.items);
                // Calling fetchGistDetails method for assigning gist data if already exists.
                fetchGistDetails();
            } else {
                $scope.errorMessage = "Something went wrong, Please reload the page or try after some time.";
            }
        });
    };
    /**
     * @ngdoc function
     * @name createGist
     * @description
     * This method is create Gist data.
     */
    $scope.createGist = function(user) {
        // Declare object.
        var gistData = {
            public: true,
            files: {}
        };
        if (user.description) {
            gistData.description = user.description;
        }
        if (user.fileContent) {
            // Assigning gist file name as user name. 
            gistData.files[user.login] = {
                content: user.fileContent
            };
        }
        SearchService.addGistData(gistData, function(response, error, status) {
            if (response && response.id) {
                // If Gist data successfully created then mapping Gist ID with respective user ID.
                $scope.userAndGistMapping[user.id] = response.id;
                $scope.successMessage = "Gist data has been added successfully for the user " + user.login + '.';
                // Encrypted mapping before saving in local storage.
                var encrypted = $crypto.encrypt(JSON.stringify($scope.userAndGistMapping));
                // userAndGistMapping only contains userID with their respective Gist ID.
                localStorage.setItem('userAndGistMapping', encrypted);
            } else {
                $scope.errorMessage = "Something went wrong, Please reload the page or try after some time.";
            }
        });
    };
    /**
     * @ngdoc function
     * @name fetchGistDetails
     * @description
     * This method is for fetching gist details.
     */
    function fetchGistDetails() {
        //If user and gist mapping exists then go further.
        if (!localStorage.getItem('userAndGistMapping')) {
            return;
        }
        // Decrypting userAndGistMapping local storage value.
        var decrypted = localStorage.getItem('userAndGistMapping');
        $scope.userAndGistMapping = JSON.parse($crypto.decrypt(decrypted));
        if (!angular.isObject($scope.userAndGistMapping)) {
            return;
        }
        //In this loop we assign gist data to their respective users.
        angular.forEach($scope.userAndGistMapping, function(gistID, userID) {
            SearchService.getGistData(gistID, function(response, error, status) {
                if (response) {
                    angular.forEach($scope.userList, function(user, userKey) {
                        try {
                            if (user.id == userID) {
                                $scope.userList[userKey].description = response.description;
                                $scope.userList[userKey].fileContent = response.files[user.login].content;
                            }
                        } catch (error) {
                            $log.error(error);
                        }
                    });
                } else {
                    $scope.errorMessage = "Something went wrong, Please reload the page or try after some time.";
                }
            });
        });
    };
    /**
     * @ngdoc function
     * @name resetData
     * @description
     * This method reset message values on keypress.
     */
    $scope.resetData = function() {
        $scope.errorMessage = null;
        $scope.successMessage = null;
    };
}]);