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
      return JSON.parse($window.localStorage[key] || '[{}]');
    }
  }
}])

.factory('WantToWatchService', ['$window', '$localstorage', function($window, $localstorage) {


  var separator = '|';

  return {
    add: function(key, value) {
    	//get the local storage
    	//var separator = '|';
    	console.log('localstorage: ', $localstorage.get(key, false));

    	if($localstorage.get(key, false) === false) {
    		separator = '';
    	}
    	$localstorage.set(key, $localstorage.get(key, '') + separator + JSON.stringify(value));

    },
    setObject: function(key, value) {
      return $localstorage.setObject(key, value);
    },
    getObject: function(key) {
      return $localstorage.getObject(key);
    },
    remove: function(key, index) {
      console.log('Will remove pos %a from %b', index, key);
      
      var list = $localstorage.get(key, '');
      var list_array = list.split(separator);
      list_array.splice(index, 1);
      //SAVE BACK to local storage

      $localstorage.set(key,list_array.join(separator));

      //return $window.localStorage[key] || defaultValue;
    },
    list: function(key) {
      var list = $localstorage.get(key, '');
      // explode to an array
      console.log(list);
      var list_array =[];
      
      if(list !== '') {
        list_array = list.split("|");
      } 
      var i;

      console.log(list_array.length);
      console.log(list_array);


      for(i =0; i <list_array.length; i ++) {
        //console.log(JSON.parse(list_array[i]));
        //var example = "'" + list_array[i] + "'";
        var example = list_array[i];
        list_array[i] = JSON.parse(example);
      }
      console.log('this is sthe list array');
      console.log(list_array);
      return list_array;
      //explose on separator and return as array

    }, 
    find: function(key, id) {
      console.log('Im looking for something %s', id);
      var metest = this.list(key);
      console.log('----- metest here');
      console.log(metest[id]);
      return metest[id];

    }
  }

}]);