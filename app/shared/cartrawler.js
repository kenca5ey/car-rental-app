(function() {

	/**
	* Service to handle the cartrawler data.
	* Can get an initial JSON payload and extract useful data
	*/
	var cartrawler = function($http) {

		var rawJsonData, extractedCarsArray = [];

		/**
		* Send and receive $htttp request
		*/
		var getRawJsonData = function() {
			return $http.get("assets/json/cardata.json")
				.then(function(response) {
					rawJsonData = response.data;
					return rawJsonData;
				});
		};

		/**
		* Extract the vehicle data from the JSON in useful format
		*/
		var getCarsFromRawJson = function(rawJsonArray) {
			var vehAvails, vehVendorAvails, i, j, vendor, vehicle;
			
			if(0<extractedCarsArray.length) extractedCarsArray.length = 0;

			vehVendorAvails = rawJsonArray[0].VehAvailRSCore.VehVendorAvails;

			for(i=0;i< vehVendorAvails.length; i++){
				vehAvails = vehVendorAvails[i].VehAvails;
				vendor = vehVendorAvails[i].Vendor;
				for(j=0; j<vehAvails.length;j++){
					vehicle = vehAvails[j];
					vehicle.vendor = vendor;
					extractedCarsArray.push(vehicle);
				}
			}

			return extractedCarsArray;
		};

		/**
		* Extract the location data from the JSON in useful format
		*/
		var getLocDetailsFromRawJson = function(rawJsonArray){
			return rawJsonArray[0].VehAvailRSCore.VehRentalCore;
		};


		/**
		* Public api for the methods and variables
		*/
		return {
			getRawJsonData: getRawJsonData,
			getCarsFromRawJson: getCarsFromRawJson,
			getLocDetailsFromRawJson: getLocDetailsFromRawJson,
			extractedCarsArray: extractedCarsArray
		};

	};

	/**
	* Add the service to the app module 
	*/
	var module = angular.module("cartrawlerViewer");
	module.factory("cartrawler", ["$http", cartrawler]);

}());