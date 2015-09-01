var table = angular.module('TableDirective', []);
table.directive('tableDirective', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl:'/Angular-Google-Map/template/Table.html'
    };
});