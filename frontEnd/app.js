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
        //Add routing for form
        .when('/form', {
            templateUrl: 'form.html', 
            controller: 'form_controller'
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

//Main Controller
MainController.$inject = ['$scope'];
angular.module('app').controller('MainController', MainController);

//Project Page Controller
angular.module('app').controller('project_page', ['$scope', '$routeParams', '$http', '$log', function ($scope, $routeParams, $http, $log) {
    $scope.num = $routeParams.num;
 
    $http.get('fake_data.json') 
        .then(function(result) {
        console.log(result);
        });
}]);

//Form Controller
angular.module('app').controller('form_controller', ['$scope', '$routeParams', '$http', '$log', function ($scope, $routeParams, $http, $log) {
    $scope.getFormData = function () {
		alert("submitted");
		console.log($scope.project);
		//$window.location.href = '#/confirm';
	}
}]);
// Clean code leads to:
// Easier onboarding for new team members (or future self)
// Easier debugging
// Easier to maintain
