var map = angular.module('AngularMapDirective', []);
myApp.directive('googleMap',function($interval){

    return {
        restrict: 'E',
        scope: {
            center: '=',
            zoom: '=',
            markers: '='
        },
        template: '<div id="map" ></div>',
        link: function(scope) {
            var array = [];
            var map;

            function initializeMap (){
                var mapOptions = {
                    center: {
                        lat: scope.center.latitude,
                        lng: scope.center.longitude
                    },
                    zoom: scope.zoom
                };
                map	= new google.maps.Map(document.getElementById("map"), mapOptions);
                scope.markers.forEach(function(marker) {
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(marker.latitude, marker.longitude),
                        title: marker.title,
                        map: map
                    });
                    array.push(marker);
                });

            }
            initializeMap();
            scope.$watch("markers", function(newValue, oldValue) {
                if(!(newValue === oldValue)){

                    for(var i = 0; i < newValue.length; i++){
                        if(newValue[i].longitude == oldValue[i].longitude &&
                            newValue[i].latitude == oldValue[i].latitude){
                            //the location is the same
                            //the incremental rendering will happen if the visibility changes
                            if(newValue[i].options.visible != oldValue[i].visible){
                                array[i].setVisible(newValue[i].options.visible);
                            }
                        }else{
                            //the location changes, location rendering must be executed.
                            array[i].setPosition(new google.maps.LatLng(newValue[i].latitude, newValue[i].longitude));
                            if(newValue[i].options.visible != oldValue[i].visible){
                                array[i].setVisible(newValue[i].options.visible);
                            }
                        }
                    }
                }
            },true);
        }
    };
});