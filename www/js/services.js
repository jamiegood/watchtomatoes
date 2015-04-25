  angular.module('starter.services', [])
.factory('RottenAPI', function ($http, APIProvider) {

    var dataFactory = {};
    var movieCache ={};

    dataFactory.getCache = function(type) {
    		if(movieCache[type]) {
    			return movieCache[type];
    		} else {
    			return false;
    		}
    }

    dataFactory.getMovies = function (type, page) {

	    		var apiurl = APIProvider.getAPIFor(type, page);
	    	  console.log(apiurl);

	        return $http.jsonp(apiurl).
					  success(function(data, status, headers, config) {

					    if (movieCache[type]) {
                movieCache[type] = movieCache[type].concat(data.movies);
              } else {

                movieCache[type] = data.movies;                
              }

					  }).
					  error(function(data, status, headers, config) {
					    // called asynchronously if an error occurs
					    // or server returns response with an error status.
						  console.log('Opps!', data);

					  });        

    };

    dataFactory.doSearch = function (searchTerm) {

	    		var apiurl = APIProvider.doSearch(searchTerm);
	    	
	        return $http.jsonp(apiurl).
					  success(function(data, status, headers, config) {
					    // this callback will be called asynchronously
					    // when the response is available
					    movieCache['search'] = data.movies;

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
  var limit = 10
  var initial_page = 1;

	obj.getAPIFor = function(type, page) {
    if(!page) page = initial_page;
		apiurl = config.baseUrl + config[type]+ '?apikey='+config.apikey+'&page='+page+'&page_limit='+limit+'&callback=JSON_CALLBACK';

  	return apiurl;
	}

	var type = 'search';

	obj.doSearch = function(term) {
		apiurl = config.baseUrl + config[type]+ '?apikey='+config.apikey+'&page_limit='+limit+'&q='+term+'&callback=JSON_CALLBACK';

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
  var list_array =[];

  return {
    add: function(key, value) {
    	//get the local storage
    	var separatorAdd = separator;
    //	console.log('localstorage: ', $localstorage.get(key, false));

    	if($localstorage.get(key, false) === false) {
    		separatorAdd = '';
    	}
    	$localstorage.set(key, $localstorage.get(key, '') + separatorAdd + JSON.stringify(value));

    },
    setObject: function(key, value) {
      return $localstorage.setObject(key, value);
    },
    getObject: function(key) {
      return $localstorage.getObject(key);
    },
    remove: function(key, index) {

      var list = $localstorage.get(key, '');

      var list_array = list.split(separator);
      list_array.splice(index, 1);

      $localstorage.set(key,list_array.join(separator));

    },
    list: function(key) {
      var list = $localstorage.get(key, '');
      // explode to an array
      var list_array =[];
      
      if(list !== '') {
        list_array = list.split("|");
        console.log("list not enough to space");
      } 
      var i;

      for(i =0; i <list_array.length; i++) {
        console.log(i);
        var example = list_array[i];
        list_array[i] = JSON.parse(example);
      }

      return list_array;

    }, 
    getStore: function() {
      return list_array;
    },
    find: function(key, id) {
      var item = this.list(key);
      return item[id];

    }
  }

}]);