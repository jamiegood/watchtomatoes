angular.module('starter.directives', ['starter.directives'])
.directive('imgPreload', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
      scope: {
        ngSrc: '@'
      },
      link: function(scope, element, attrs) {
        element.on('load', function() {

          element.addClass('in');
        }).on('error', function() {
          console.log('Opps!');
        });

        scope.$watch('ngSrc', function(newVal) {
          element.removeClass('in');
        });
      }
    };
}]);





