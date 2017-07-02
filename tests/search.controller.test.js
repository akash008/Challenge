describe('SearchController', function() {
    beforeEach(module('FoghornApp'));
    var SearchService, crypto, q, scope, controller;
    beforeEach(inject(function($rootScope, $controller, $crypto, $q, _SearchService_) {
        SearchService = _SearchService_;
        crypto = $crypto;
        q = $q;
        scope = $rootScope.$new();
        controller = $controller('SearchController', {
            $scope: scope,
            SearchService: SearchService
        });
    }));
    describe('initialization', function() {
        it('initializes with proper $scope variables and methods', function() {
            scope.$apply();
            expect(scope.userList).toEqual([]);
            expect(scope.userName).toEqual();
            expect(scope.page).toEqual(0);
            expect(scope.perPage).toEqual(5);
            expect(scope.errorMessage).toEqual(null);
        });
        it('user list should be empty', function() {
            scope.$apply(function() {
                scope.searchGitHubUser();
                expect(scope.userList).toEqual([]);
            });
        });
        it('reset the data', function() {
            scope.$apply(function() {
                scope.resetData();
                expect(scope.errorMessage).toEqual(null);
                expect(scope.successMessage).toEqual(null);
            });
        });
    });
});