angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $window) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/logOut.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };  

  // Triggered in the login modal to close it
  $scope.closeLogOut = function() {
    $window.location.reload();

    $scope.modal2.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };  

  // Open the login modal
  $scope.logOut = function() {
    $scope.modal2.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };



  $scope.fbLogin = function() {

  $scope.loginState = false;

    openFB.login(
        function(response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $scope.loginState = true;

                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        },
        {scope: 'email,publish_actions'});
  };

  $scope.fbLogOut = function() {

  //$scope.loginState = false;

    openFB.logout( function(){
      $window.location.reload();

    });
  };

})

.controller('OpeningsCtrl', function($scope, RottenAPI, $ionicLoading) {

  $scope.movies = '';
  $scope.type = 'openings';
  $scope.menu = 'Openings';  

  $ionicLoading.show({template: 'Loading...'});

  RottenAPI.getMovies($scope.type).
    success( function(data) {
      $ionicLoading.hide();
      $scope.movies = data.movies;
    });

  $scope.loadMore = function() {
    console.log('...load more...');
  }
})

.controller('UpcomingsCtrl', function($scope, RottenAPI, $ionicLoading) {

  $scope.type = 'upcoming';
  $scope.menu = 'Up Coming';

  console.log(' >>>>>>>>>In Upcomings    Ctrl');

  $ionicLoading.show({template: 'Loading...'});
  $scope.movies = [];

  var initial_page = 1;
  var page_size = 1;
  $scope.scroller = true;

  $scope.$broadcast('scroll.infiniteScrollComplete');



  $scope.loadMore = function() {
    
    if(page_size == $scope.movies.length) {
      $scope.scroller = false;
    }
        
      console.log('Load more ....');

      console.log(initial_page);

    if($scope.scroller) {


      RottenAPI.getMovies($scope.type, initial_page).
        success( function(data) {
          $ionicLoading.hide();
          console.log("I am data movies", data.movies);
          page_size = data.total;


          initial_page += 1;
          console.log(initial_page);
          $scope.$broadcast('scroll.infiniteScrollComplete');

          //$scope.movies = data.movies;
          $scope.movies = $scope.movies.concat(data.movies);
          console.log($scope.movies);

          console.log(data.total);
          console.log($scope.movies.length);



        });   
      } 
  }
})

.controller('InTheatersCtrl', function($scope, RottenAPI, $ionicLoading) {


  $scope.movies = '';
  $scope.type = 'in_theaters';
  $scope.menu = 'Cinema';

  $ionicLoading.show({template: 'Loading...'});

  RottenAPI.getMovies($scope.type).
    success( function(data) {
      $ionicLoading.hide();
      console.log(data.movies);
      $scope.movies = data.movies;
    });



})
.controller('SearchCtrl', function($scope, $stateParams, RottenAPI, $ionicLoading) {

  $scope.type = 'search';
  console.log(' >>>>>>>>>In SearchCtrl Ctrl');
  //var moviecache = RottenAPI.getCache(type);

  $scope.movies = [];
  $scope.searchtermX = '';

//$scope.movies = $scope.movies.concat(data.movies);

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
.controller('DetailCtrl', function($scope, $localstorage, $stateParams, RottenAPI, config, WantToWatchService, $ionicLoading) {

  var type = $stateParams.type;
  console.log(type);
  var movie = {};
  console.log(' THI IS NOT WORKING>>>>>>>>>In Detail ctrl    Ctrl');
  var moviecache = RottenAPI.getCache(type);

  if(moviecache) {
      console.log("THis is the index: " + $stateParams.id);
      console.log("THis is the index: " + $stateParams.id);
      console.log("This is moviecache: ", moviecache);      
      movie = moviecache[$stateParams.id];
      console.log('MOVIE CACHE: ', movie);
      movie.largeImage = config.largeImgURL + movie.posters.original.split('movie/')[1];
      $scope.movie = movie;
      console.log($scope.movie);
  } else {
    RottenAPI.getMovies(type).
      success( function(data) {
        console.log('This is data movies: ' + data.movies);
        movie = data.movies[$stateParams.id];
        movie.largeImage = config.largeImgURL + movie.posters.original.split('movie/')[1];
        //transform to a larger image
        $scope.movie = movie;
        console.log($scope.movie);
      });
  }

  $scope.save = function(movie) {
    console.log('I clicked on save %s', movie);
    console.log(movie);
    // add to WantToWatchService
    console.log(movie);
    console.log(config.localStorageKey);
    WantToWatchService.add(config.localStorageKey, movie);
    $ionicLoading.show({ template: 'Item saved!', noBackdrop: true, duration: 2000 });

  }  

  $scope.remove = function() {
    console.log('I clicked on remove %s', id);
    $ionicLoading.show({ template: 'Item removed!', noBackdrop: true, duration: 1000 });

    console.log($stateParams.id);
    
  }

})
.controller('WantToWatchCtrl', function($scope, WantToWatchService, $stateParams, RottenAPI, config, $ionicLoading) {

  console.log(' >>>>>>>In WantToWatch ctrl    Ctrl');
  $scope.shouldShowDelete = false;
  //get from local storage.
  var data = {}, localStorageKey = config.localStorageKey;

 // data.movies = WantToWatchService.list(localStorageKey);
  //console.log(data.movies);
  $scope.menu = 'To Watch';
  //console.log(data.movies);
  $scope.movies = WantToWatchService.list(localStorageKey);

  // var test = WantToWatchService.getStore();
  //  $scope.$watch('test', function() {
  //        console.log('hey, myVar has changed!');
  //        $scope.movies  = WantToWatchService.list(config.localStorageKey);   
  //    });
   
  $scope.delete = function(index) {
     console.log(localStorageKey + " :: " + index);

    WantToWatchService.remove(localStorageKey, index);
    //console.log
      $scope.movies  = WantToWatchService.list(localStorageKey);
          $ionicLoading.show({ template: 'Item removed!', noBackdrop: true, duration: 1000 });


  }


})
.controller('SaveDetailCtrl', function($scope, $localstorage, $stateParams, WantToWatchService, config, $location, $ionicLoading) {

  var id = $stateParams.id;
  console.log(id);
  var movie = {};
  console.log(' THI IS NOT WORKING>>>>>>>>>In Detail ctrl    Ctrl');
  $scope.movie = WantToWatchService.find(config.localStorageKey, id);
  $scope.index = $stateParams.id;
  console.log($scope.movie);

   $scope.$watch($scope.movies, function() {
         console.log('hey, myVar has changed!');
         $scope.movies  = WantToWatchService.list(config.localStorageKey);   
     });

  $scope.remove = function() {
    console.log('I clicked on remove %s', id);
    console.log($stateParams.id);
    WantToWatchService.remove(config.localStorageKey, $scope.index);
    //console.log
      $scope.movies  = WantToWatchService.list(config.localStorageKey);   
      $location.path('/app/wanttowatch'); 
      $ionicLoading.show({ template: 'Item removed!', noBackdrop: true, duration: 1000 });

  }


})

.controller('ProfileCtrl', function($scope, $window) {

    //check if logged in?
    if($scope.loginState == false) {
      $window.location ="/";
    }

    openFB.api({
        path: '/me',
        params: {fields: 'id,name'},
        success: function(user) {
            $scope.$apply(function() {
                $scope.user = user;
                $scope.loginState = true;

            });
        },
        error: function(error) {
            alert('Facebook error: ' + error.error_description);
        }
    });
});





