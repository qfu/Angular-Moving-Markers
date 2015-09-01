var drop = angular.module('DropDirective', []);
drop.directive('dropDirective', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl:"/Angular-Google-Map/template/Dropdown.html"
    };
});