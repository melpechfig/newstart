angular.module('app', ['ngMaterial', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'MainController'
        })
        .when('/project_page/:num', {
            templateUrl: 'project_page.html',
            controller: 'project_page'
        })
        .otherwise({
            templateUrl: 'pages/main.html',
            controller: 'MainController'
        });
});
// Explicit dependency injection
function MainController($scope) {
    $scope.projects = ['Happy', 'Two', 'Three', 'Four', 'Five', 'Six'];
    
    //To Do: Ability to Add Projects to list
}
MainController.$inject = ['$scope'];
angular.module('app').controller('MainController', MainController);

// Inline Annotation
angular.module('app').controller('project_page', ['$scope', '$routeParams', '$http', '$log', function ($scope, $routeParams, $http, $log) {
    $scope.num = $routeParams.num;
 
    $http.get('fake_data.json') 
        .then(function(result) {
        console.log(result);
        });
}]);

// Clean code leads to:
// Easier onboarding for new team members (or future self)
// Easier debugging
// Easier to maintain
