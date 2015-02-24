angular.module('starter.services', [])
.factory('RottenAPI', function ($http, APIProvider) {

    //var urlBase = '/mocks/upcoming.json?apikey='+apikey+'&page_limit=1&callback=JSON_CALLBACK';
    var dataFactory = {};
    var movieCache ={};

    dataFactory.getCache = function(type) {
    		if(movieCache[type]) {
    			console.log('this is the cache: ' + JSON.stringify(movieCache[type]));
    			return movieCache[type];
    		} else {
    			return false;
    		}
    }

    dataFactory.getMovies = function (type) {

	    		var apiurl = APIProvider.getAPIFor(type);
	    	
	        return $http.jsonp(apiurl).
					  success(function(data, status, headers, config) {
					    // this callback will be called asynchronously
					    // when the response is available
					    movieCache[type] = data;
					    console.log('yes', data);
					  }).
					  error(function(data, status, headers, config) {
					    // called asynchronously if an error occurs
					    // or server returns response with an error status.
							console.log('OOOOpps', data);

					  });        

    };

    dataFactory.doSearch = function (searchTerm) {

	    		var apiurl = APIProvider.doSearch(searchTerm);
	    	
	        return $http.jsonp(apiurl).
					  success(function(data, status, headers, config) {
					    // this callback will be called asynchronously
					    // when the response is available
					    movieCache['search'] = data;
					    console.log('yes', data);
					  }).
					  error(function(data, status, headers, config) {
					    // called asynchronously if an error occurs
					    // or server returns response with an error status.
							console.log('OOOOpps', data);

					  });        

    };
    return dataFactory;
})
.factory('APIProvider', function(config) {

	var obj = {};
	var apiurl = '';

	obj.getAPIFor = function(type) {
		apiurl = config.baseUrl + config[type]+ '?apikey='+config.apikey+'&page_limit=10&callback=JSON_CALLBACK';
		console.log('MAKE THIS CALL for: ' + apiurl);
  	return apiurl;
	}

	var type = 'search';

	obj.doSearch = function(term) {
		apiurl = config.baseUrl + config[type]+ '?apikey='+config.apikey+'&page_limit=10&q='+term+'&callback=JSON_CALLBACK';
		console.log('MAKE THIS CALL for: ' + apiurl);
  	return apiurl;		
	}

	return obj;

})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('WantToWatchService', ['$window', '$localstorage', function($window, $localstorage) {


  return {
    add: function(key, value) {
    	//get the local storage
    	var separator = '|';
    	console.log('localstorage: ', $localstorage.get(key, false));
    	if($localstorage.get(key, false) === false) {
    		separator = '';
    	}
    	$localstorage.set(key, $localstorage.get(key, '') + separator + value);

    },
    remove: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    list: function(key) {
      var list = $localstorage.get(key, '');
      var list_array = list.split('|');
      return list_array;
      //explose on separator and return as array

    }
  }

}]);