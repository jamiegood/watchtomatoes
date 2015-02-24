angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('OpeningsCtrl', function($scope, RottenAPI, $ionicLoading) {

  $scope.movies = '';
  $scope.type = 'openings';

  $ionicLoading.show({template: 'Loading...'});

  RottenAPI.getMovies($scope.type).
    success( function(data) {
      $ionicLoading.hide();
      $scope.movies = data.movies;
    });
})

.controller('OpeningCtrl', function($scope, $stateParams, RottenAPI) {

  $scope.type = 'openings';

  var moviecache = RottenAPI.getCache(type);

  if(moviecache) {
      $scope.movie = moviecache.movies[$stateParams.id];
  } else {
    RottenAPI.getMovies($scope.type).
      success( function(data) {
        console.log('This is data movies: ' + data.movies);
        $scope.movie = data.movies[$stateParams.id];
      });
  }

})
.controller('UpcomingsCtrl', function($scope, RottenAPI, $ionicLoading) {

  $scope.type = 'upcoming';
  $ionicLoading.show({template: 'Loading...'});
  $scope.movies = '';

  RottenAPI.getMovies($scope.type).
    success( function(data) {
      $ionicLoading.hide();
      console.log(data.movies);
      $scope.movies = data.movies;
    });
})

.controller('UpcomingCtrl', function($scope, $stateParams, RottenAPI) {

  var type = 'upcoming';
  console.log(' THI IS NOT WORKING>>>>>>>>>In Upcoming    Ctrl');
  var moviecache = RottenAPI.getCache(type);

  if(moviecache) {
      console.log("THis is the index: " + $stateParams.id);
      $scope.movie = moviecache.movies[$stateParams.id];

      console.log($scope.movie);
  } else {
    RottenAPI.getMovies(type).
      success( function(data) {
        console.log('This is data movies: ' + data.movies);
        $scope.movie = data.movies[$stateParams.id];
      });
  }

})

.controller('InTheatersCtrl', function($scope, RottenAPI, $ionicLoading) {


  $scope.movies = '';
  $scope.type = 'in_theaters';

  $ionicLoading.show({template: 'Loading...'});

  RottenAPI.getMovies($scope.type).
    success( function(data) {
      $ionicLoading.hide();
      console.log(data.movies);
      $scope.movies = data.movies;
    });



})

.controller('InTheaterCtrl', function($scope, $stateParams, RottenAPI) {

  var type = 'in_theaters';
  console.log(' THI IS NOT WORKING>>>>>>>>>In in_theaters    Ctrl');
  var moviecache = RottenAPI.getCache(type);

  if(moviecache) {
      console.log("THis is the index: " + $stateParams.id);
      $scope.opening = moviecache.movies[$stateParams.id];

      console.log($scope.movie);

  } else {
    RottenAPI.getMovies(type).
      success( function(data) {
        console.log('This is data movies: ' + data.movies);
        $scope.movie = data.movies[$stateParams.id];
      });
  }

})
.controller('SearchCtrl', function($scope, $stateParams, RottenAPI, $ionicLoading) {

  $scope.type = 'search';
  console.log(' >>>>>>>>>In SearchCtrl Ctrl');
  //var moviecache = RottenAPI.getCache(type);

  $scope.movies = '';
  $scope.searchtermX = '';

  var doSearch = ionic.debounce(function(searchterm) {
    $ionicLoading.show({template: 'Loading...'});

    RottenAPI.doSearch(searchterm).
      success( function(data) {
        $ionicLoading.hide();
        $scope.movies = data.movies;
      });
  }, 500);

  $scope.search = function(searchtermX) {
    doSearch(searchtermX);
  }

})
.controller('SearchOneCtrl', function($scope, $stateParams, RottenAPI) {

  var type = 'search';
  console.log(' THI IS NOT WORKING>>>>>>>>>In searchOne    Ctrl');
  var moviecache = RottenAPI.getCache(type);
  if(moviecache) {
      console.log("THis is the index: " + $stateParams.openingId);
      $scope.opening = moviecache.movies[$stateParams.openingId];

      console.log($scope.opening);
  } else {
    RottenAPI.doSearch(type).
      success( function(data) {
        console.log('This is data movies: ' + data.movies);
        $scope.opening = data.movies[$stateParams.openingId];
      });
  }

})
.controller('ListCtrl', function($scope, $localstorage, $stateParams, RottenAPI) {

  console.log(' >>>>>>>In list ctrl    Ctrl');

  //get from local storage.
  //var data = $localstorage.get('movie', 'default value');
  // /$scope.openings = data.movies;
  $scope.menu = 'To Watch';
  $scope.movies = '';
  console.log(' In in_theaters');

  RottenAPI.getMovies('in_theaters').
    success( function(data) {
      console.log(data.movies);
      $scope.movies = data.movies;
    });


})
.controller('DetailCtrl', function($scope, $localstorage, $stateParams, RottenAPI) {

  var type = $stateParams.type;
  console.log(type);

  console.log(' THI IS NOT WORKING>>>>>>>>>In Detail ctrl    Ctrl');
  var moviecache = RottenAPI.getCache(type);

  if(moviecache) {
      console.log("THis is the index: " + $stateParams.id);
      $scope.movie = moviecache.movies[$stateParams.id];

      console.log($scope.movie);
  } else {
    RottenAPI.getMovies(type).
      success( function(data) {
        console.log('This is data movies: ' + data.movies);
        $scope.movie = data.movies[$stateParams.id];
      });
  }


})
.controller('WantToWatchCtrl', function($scope, WantToWatchService, $stateParams, RottenAPI) {

  console.log(' >>>>>>>In WantToWatch ctrl    Ctrl');

  //get from local storage.
  var data = {}, localStorageKey = 'wanttowatch'; 

  var wanttowatch = 'movie' + Math.floor((Math.random() * 10) + 1);
  WantToWatchService.add(localStorageKey, JSON.stringify({blah:123}) );
  data.movies = WantToWatchService.list(localStorageKey);
  console.log(data.movies);
  $scope.menu = 'To Watch';
  
  $scope.movies = data.movies;
  // console.log(' In in_theaters');

  // RottenAPI.getMovies('in_theaters').
  //   success( function(data) {
  //     console.log(data.movies);
  //     $scope.movies = data.movies;
  //   });


});






