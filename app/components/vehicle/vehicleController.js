(function() {

	var module = angular.module("cartrawlerViewer");

	/**
	* Controller to manage the detailed car view page
	*/
	var VehicleController = function($scope, $routeParams, $location, cartrawler) {

		/**
		* Find and add the current vehicle to scope
		*/
		var addVehicleToScope = function(arr, key) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].$$hashKey === key) {
					$scope.vehicleDetail = arr[i];
				}
			}
		};

		/**
		* Navigate back to the main
		*/
		$scope.redirectToMain = function() {
			$location.path('/main');
		};

		/**
		* If no data for vehicle then navigate back to main
		* Otherwise add the vehicle to scope
		*/
		if (cartrawler.extractedCarsArray.length === 0) $scope.redirectToMain();
		addVehicleToScope(cartrawler.extractedCarsArray, $routeParams.code);
	};

	/**
	* Add controller to app
	* Passing in dependencies to protect them when minifiying
	*/
	module.controller("VehicleController", ["$scope", "$routeParams", "$location", "cartrawler", VehicleController]);
}());