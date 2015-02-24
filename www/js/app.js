// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// API config
.constant('config', {
  baseUrl: 'http://api.rottentomatoes.com/api/public/v1.0/', 
  apikey: 'qucq59pr5qynpctjpvbuxcq3',
  openings: 'lists/movies/opening.json',
  upcoming: 'lists/movies/upcoming.json',
  in_theaters: 'lists/movies/in_theaters.json',
  search: 'movies.json'
})


// Routes
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html",
        controller: 'SearchCtrl'        
      }
    }
  })  
  .state('app.searchOne', {
    url: "/searchone/:openingId",
    views: {
      'menuContent': {
        templateUrl: "templates/searchone.html",
        controller: 'SearchOneCtrl'        
      }
    }
  })
   .state('app.in_theatres', {
     url: "/in_theaters",
     views: {
       'menuContent': {
         templateUrl: "templates/in_theaters.html",
          controller: 'InTheatersCtrl'        
       }
    }
  })  
   .state('app.in_theatre', {
     url: "/in_theater/:openingId",
     views: {
       'menuContent': {
          templateUrl: "templates/in_theater.html",
          controller: 'InTheaterCtrl'        
       }
    }
  })  

  .state('app.upcoming', {
    url: "/upcoming",
    views: {
      'menuContent': {
        templateUrl: "templates/upcoming.html",
        controller: 'UpcomingsCtrl'        
      }
    }
  })
  .state('app.upcomingOne', {
    url: "/upcoming/:openingId",
    views: {
      'menuContent': {
        templateUrl: "templates/upcomingone.html",
        controller: 'UpcomingCtrl'        
      }
    }
  })  
    .state('app.openings', {
      url: "/openings",
      views: {
        'menuContent': {
          templateUrl: "templates/openings.html",
          controller: 'OpeningsCtrl'
        }
      }
    })

  .state('app.opening', {
      url: "/opening/:openingId",
      views: {
        'menuContent': {
          templateUrl: "templates/opening.html",
          controller: 'OpeningCtrl'
        }
      }
    })
  .state('app.wanttowatch', {
      url: "/wanttowatch",
      views: {
        'menuContent': {
          templateUrl: "templates/list.html",
          controller: 'WantToWatchCtrl'
        }
      }
    })    
  .state('app.wanttowatchID', {
      url: "/detail/:id",
      views: {
        'menuContent': {
          templateUrl: "templates/detail.html",
          controller: 'DetailCtrl'
        }
      }   
    });


 // });

  //// if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/openings');
});
