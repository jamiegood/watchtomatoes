// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives'])

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
  search: 'movies.json',
  largeImgURL: 'http://content6.flixster.com/movie/',
  localStorageKey: 'wanttowatch'
})


// Routes
.config(function($stateProvider, $urlRouterProvider) {

  openFB.init({appId: '383284458515356'});

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
   .state('app.in_theatres', {
     url: "/in_theaters",
     views: {
       'menuContent': {
         templateUrl: "templates/list.html",
          controller: 'InTheatersCtrl'        
       }
    }
  })  

  .state('app.upcoming', {
    url: "/upcoming",
    views: {
      'menuContent': {
        templateUrl: "templates/list.html",
        controller: 'UpcomingsCtrl'        
      }
    }
  })

    .state('app.openings', {
      url: "/openings",
      views: {
        'menuContent': {
          templateUrl: "templates/list.html",
          controller: 'OpeningsCtrl'
        }
      }
    })

  .state('app.wanttowatch', {
      url: "/wanttowatch",
      views: {
        'menuContent': {
          templateUrl: "templates/save-list.html",
          controller: 'WantToWatchCtrl'
        }
      }
    })    
    .state('app.wanttowatchID', {
      url: "/detail/wanttowatch/:id",
      views: {
        'menuContent': {
          templateUrl: "templates/save-detail.html",
          controller: 'SaveDetailCtrl'
        }
      }   
    })
  .state('app.detail', {
      url: "/detail/:type/:id",
      views: {
        'menuContent': {
          templateUrl: "templates/detail.html",
          controller: 'DetailCtrl'
        }
      }   
    })

.state('app.profile', {
  url: "/profile",
  views: {
      'menuContent' :{
          templateUrl: "templates/profile.html",
          controller: "ProfileCtrl"
      }
  }
});

 // });

  //// if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/openings');
});
