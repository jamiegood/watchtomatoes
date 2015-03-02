angular.module('starter.directives', ['starter.directives'])
.directive('imgPreload', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
      scope: {
        ngSrc: '@'
      },
      link: function(scope, element, attrs) {
        element.on('load', function() {

          console.log('IMAGE LOADED - ADD CLASS IN');
          element.addClass('in');
        }).on('error', function() {
          //
        });

        scope.$watch('ngSrc', function(newVal) {
          element.removeClass('in');
                    console.log('IMAGE listed - REMOVE CLASS IN');
        });
      }
    };
}]);





