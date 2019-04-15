//var ProjectModel = function(Parse) {
//    this.Parse = Parse;
//    
//    //Create new instance
//    this.New = function() {
//         
//    };
//      
//}


angular.module('app', ['ngMaterial', 'ngRoute', 'ngParse']);


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


//Configure Parse
angular.module('app')
    .config(['ParseProvider', function(ParseProvider) {
    var MYAPPID = 'FTTtwUv5DtF0LuFt4PA8jHGHP2jK60CCVhDxUxVX';
    var MYJSKEY = 'aVgj9ETDvScrN0ctKNAFbboYmWb3UtVz1r5fBuTZ';

    ParseProvider.initialize(MYAPPID, MYJSKEY);
    ParseProvider.serverURL = 'https://parseapi.back4app.com/';
}]);


//
//
//
/* Trip Model */
var ProjectModel = function(Parse) {
	this.Parse = Parse;
	this.data = {};
	this.collection = [];
	this.name = 'project';
	this.New = New;
	this.getById = getById;
	this.getByName = getByName;
	this.getByDest = getByDest;
	this.getByDestAll = getByDestAll;
	this.addProject= addProject;

	function New(obj) {
		if (angular.isUndefined(obj)) {
			const parseObject = new this.Parse.Object(this.name);
			return parseObject;
		} else {
			return obj;
		}
	}

	function getById(id) {
		return new this.Parse.Query(this.New()).get(id)
			.then(result => {
				this.Parse.defineAttributes(result, this.fields);
				this.data = result;
				return Promise.resolve(result);
			}).catch(error => Promise.reject(error));
	}

	function getByName(name) {
		return new this.Parse.Query(this.New())
			.equalTo('name', name)
			.first()
			.then(result => {
				this.Parse.defineAttributes(result, this.fields);
				this.data = result;
				console.log('result', result)
				return result;
			})
	}

	function getByDest(dest) {
		return new this.Parse.Query(this.New())
			.equalTo('destination', dest)
			.first()
			.then(result => {
				this.data = result;
				console.log(result);
				return result;
			})
	}

	function getByDestAll(dest) {
		return new this.Parse.Query(this.New())
			.equalTo('destination', dest)
			.find()
			.then(result => {
				this.data = result;
				return result;
			})
	}

	
	function addProject(project) {
		var newProject = this.New();
		console.log(this.data);
		Object.keys(project).forEach(function (key) {
			newProject.set(key, project[key]);
		});

		newProject.save().then(
			(result) => {
				console.log('ParseObject created', result);
			},
			(error) => {
				console.error('Error while creating ParseObject: ', error);
			}
		);
	}
}
//



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

angular.module('app').service('ProjectModel', ProjectModel);

//Form Controller
angular.module('app').controller('form_controller', ['$scope', '$routeParams', '$http', '$log', 'ProjectModel', function ($scope, $routeParams, $http, $log, ProjectModel) {
    $scope.projectFormHandler = function() {
        ProjectModel.addProject($scope.project);
    }
}]);

// Clean code leads to:
// Easier onboarding for new team members (or future self)
// Easier debugging
// Easier to maintain
