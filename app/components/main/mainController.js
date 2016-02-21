(function() {

	var module = angular.module("cartrawlerViewer");

	/**
	 * Controller to manage the main car list view
	 */
	var MainController = function($scope, $location, cartrawler) {

		/**
		 * Add useful data to $scope when data received
		 */
		var onDataRecived = function(response) {
			$scope.vehiclesDetails = cartrawler.getCarsFromRawJson(response);
			$scope.locDetails = cartrawler.getLocDetailsFromRawJson(response);
		};

		/**
		 * Notify user when bad request has been made
		 */
		var onError = function() {
			$scope.error = "Apologies, we could not fetch the raw data. Please try again soon";
			alert($scope.error);
		};

		/**
		 * Route to the vehicle details page
		 */
		$scope.onVehicleClicked = function(vehicleDetail) {
			$location.path('/main/vehicle/' + vehicleDetail.$$hashKey);
		};

		/**
		 * Declaration of the initial order of the cars
		 */
		$scope.order = {
			field: '@RateTotalAmount',
			ascending: true
		};

		/**
		 * Handle the ordering of vehicles based on various fields
		 */
		$scope.dynamicOrder = function(vehicleDetail) {
			var order;
			switch ($scope.order.field) {
				case '@RateTotalAmount':
					order = parseInt(vehicleDetail.TotalCharge[$scope.order.field]);
					break;
				case '@DoorCount':
				case '@BaggageQuantity':
					order = parseInt(vehicleDetail.Vehicle[$scope.order.field]);
					break;
				default:
					order = 0;
			}
			return order;
		};

		/**
		 * Use the cartrawler service to get data
		 * On sucess fire the onDataRecived function
		 * On failure fire the onError function
		 */
		cartrawler.getRawJsonData().then(onDataRecived, onError);

	};

	/**
	 * Add controller to app
	 * Passing in dependencies to protect them when minifiying
	 */
	module.controller("MainController", ["$scope", "$location", "cartrawler", MainController]);

}());