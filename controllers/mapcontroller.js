var myApp = angular.module('AngularMap', ['AngularMapDirective','DropDirective','TableDirective']);
myApp.controller('MapController', ['$scope','$interval', function($scope, $interval) {	
	$scope.map = { 
		center: { latitude: 39.9167, longitude: 116.3833},
		zoom: 4
	};

	$scope.markers = database;
	$scope.filter = filter;
	$scope.titleFilter = titleFilter;
	$scope.typeFilter = typeFilter;
	$scope.sizeFilter = sizeFilter;


	$scope.selectType = "";
	$scope.selectTitle = "";
	$scope.selectSize = "";

    $interval(function () {
    	for(var i = 0; i < $scope.markers.length/2; i++){
    		$scope.markers[i].latitude  = parseInt($scope.markers[i].latitude) +
				(Math.random() * (0.002 - 0.0001) + 0.0001) - 0.001;
    		$scope.markers[i].longitude = parseInt($scope.markers[i].longitude) +
				(Math.random() * (0.002 - 0.0001) + 0.0001) - 0.001;
		}
  	},500);
	$scope.$watch("[selectType, selectTitle,selectSize]",function(newValue,oldValue){
		if(!(newValue === oldValue)) {
			/*
			console.log($scope.selectSize);
			console.log($scope.selectTitle);
			console.log($scope.selectType);*/
			var filterA = ($scope.selectType == null ||
							$scope.selectType =="") ? false : true;
			var filterB = ($scope.selectTitle == null ||
							$scope.selectTitle =="") ? false : true;

			var filterC = ($scope.selectSize == null ||
							$scope.selectSize=="") ? false : true;
			for (var i = 0; i < $scope.markers.length; i++) {
				if (filterA && !filterB && !filterC) {
					$scope.markers[i].options.visible = ($scope.markers[i].type == $scope.selectType) ? true : false;
				}
				else if (filterB && !filterA && !filterC) {
					$scope.markers[i].options.visible = ($scope.markers[i].title == $scope.selectTitle) ? true : false;
				} else if (filterC && !filterB && !filterA) {
					$scope.markers[i].options.visible = ($scope.markers[i].size == $scope.selectSize) ? true : false;
				} else if (filterA && filterB && !filterC) {
					$scope.markers[i].options.visible = ($scope.markers[i].title == $scope.selectTitle &&
					$scope.markers[i].type == $scope.selectType) ? true : false;
				} else if (filterA && filterC && !filterB) {
					$scope.markers[i].options.visible = ($scope.markers[i].type == $scope.selectType &&
					$scope.markers[i].size == $scope.selectSize) ? true : false;
				} else if (filterB && filterC && !filterA) {
					$scope.markers[i].options.visible = ($scope.markers[i].title == $scope.selectTitle &&
					$scope.markers[i].size == $scope.selectSize) ? true : false;
				} else if (filterA && filterB && filterC) {
					$scope.markers[i].options.visible = ($scope.markers[i].title == $scope.selectTitle &&
					$scope.markers[i].type == $scope.selectType &&
					$scope.markers[i].size == $scope.selectSize) ? true : false;
				}
				else {
					$scope.markers[i].options.visible = true;
				}
			}
		}
	},true);
}]);

