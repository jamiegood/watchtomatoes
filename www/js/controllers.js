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

    openFB.logout( function(){
      $window.location.reload();

    });
  };

})

.controller('OpeningsCtrl', function($scope, RottenAPI, $ionicLoading) {

  $scope.type = 'openings';
  $scope.menu = 'Openings';  

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

  $scope.type = 'in_theaters';
  $scope.menu = 'Cinema';

///


  $ionicLoading.show({template: 'Loading...'});
  $scope.movies = [];

  var initial_page = 1;
  var page_size = 1;
  $scope.scroller = true;

  $scope.loadMore = function() {
    
    if(page_size == $scope.movies.length) {
      $scope.scroller = false;
    }

    if($scope.scroller) {

      RottenAPI.getMovies($scope.type, initial_page).
        success( function(data) {
          $ionicLoading.hide();
          page_size = data.total;
          initial_page += 1;
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.movies = $scope.movies.concat(data.movies);

        });   
       } 
  }    

})
.controller('SearchCtrl', function($scope, $stateParams, RottenAPI, $ionicLoading) {

  $scope.type = 'search';
  $scope.movies = [];
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
.controller('ListCtrl', function($scope, $localstorage, $stateParams, RottenAPI) {

  $scope.menu = 'To Watch';
  $scope.movies = '';

  RottenAPI.getMovies('in_theaters').
    success( function(data) {
      console.log(data.movies);
      $scope.movies = data.movies;
    });


})
.controller('DetailCtrl', function($scope, $localstorage, $stateParams, RottenAPI, config, WantToWatchService, $ionicLoading) {

  var type = $stateParams.type;
  var movie = {};
  var moviecache = RottenAPI.getCache(type);

  if(moviecache) {
      movie = moviecache[$stateParams.id];
      movie.largeImage = config.largeImgURL + movie.posters.original.split('movie/')[1];
      $scope.movie = movie;
  } else {
    RottenAPI.getMovies(type).
      success( function(data) {
        movie = data.movies[$stateParams.id];
        movie.largeImage = config.largeImgURL + movie.posters.original.split('movie/')[1];
        $scope.movie = movie;
      });
  }

  $scope.save = function(movie) {

    WantToWatchService.add(config.localStorageKey, movie);
    $ionicLoading.show({ template: 'Item saved!', noBackdrop: false, duration: config.prompt_duration });

  }  

  $scope.remove = function() {
    $ionicLoading.show({ template: 'Item removed!', noBackdrop: true, duration: config.prompt_duration });
  }

  $scope.share = function(movie) {
    

    
    openFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: "testing"
        },
        success: function () {
          $ionicLoading.show({ template: 'Item shared!', noBackdrop: false, duration: config.prompt_duration });
        },
        error: function () {
          $ionicLoading.show({ template: 'An error occurred while sharing this session on Facebook', noBackdrop: false, duration: config.prompt_duration });          
        }
    });

  }

})
.controller('WantToWatchCtrl', function($scope, WantToWatchService, $stateParams, RottenAPI, config, $ionicLoading) {

  $scope.shouldShowDelete = false;
  //get from local storage.
  var data = {}, localStorageKey = config.localStorageKey;

  $scope.menu = 'To Watch';
  $scope.movies = WantToWatchService.list(localStorageKey);
   
  $scope.delete = function(index) {
    WantToWatchService.remove(localStorageKey, index);
    $scope.movies  = WantToWatchService.list(localStorageKey);
    $ionicLoading.show({ template: 'Item removed!', noBackdrop: true, duration: config.prompt_duration });
  }


})
.controller('SaveDetailCtrl', function($scope, $localstorage, $stateParams, WantToWatchService, config, $location, $ionicLoading) {

  var id = $stateParams.id;
  var movie = {};

  $scope.movie = WantToWatchService.find(config.localStorageKey, id);
  $scope.index = $stateParams.id;
  console.log($scope.movie);

  $scope.$watch($scope.movies, function() {
        $scope.movies  = WantToWatchService.list(config.localStorageKey);   
  });

  $scope.remove = function() {
    WantToWatchService.remove(config.localStorageKey, $scope.index);
    $scope.movies  = WantToWatchService.list(config.localStorageKey);   
    $location.path('/app/wanttowatch'); 
    $ionicLoading.show({ template: 'Item removed!', noBackdrop: true, duration: config.prompt_duration });
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





