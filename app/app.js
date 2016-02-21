(function() {

/**
* Declare the app module
*/
	var app = angular.module("cartrawlerViewer", ["ngRoute"]);

/**
* Determine the routings that will place
* What views to use and which controllers to control them
*/
	app.config(function($routeProvider) {
		$routeProvider
			.when("/main", {
				templateUrl: "app/components/main/main.html",
				controller: "MainController"
			})
			.when("/main/vehicle/:code", {
				templateUrl: "app/components/vehicle/vehicle.html",
				controller: "VehicleController"
			})
			.otherwise({
				redirectTo: "/main"
			});
	});

}());