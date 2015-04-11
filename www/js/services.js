  angular.module('starter.services', [])
.factory('RottenAPI', function ($http, APIProvider) {

    //var urlBase = '/mocks/upcoming.json?apikey='+apikey+'&page_limit=1&callback=JSON_CALLBACK';
    var dataFactory = {};
    var movieCache ={};

    dataFactory.getCache = function(type) {
    		if(movieCache[type]) {
    		//	console.log('this is the cache: ' + JSON.stringify(movieCache[type]));
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
					    // this callback will be called asynchronously
					    // when the response is available
					    if (movieCache[type]) {
                console.log('===========');
                console.log(type);
                console.log(movieCache[type]);
                movieCache[type] = movieCache[type].concat(data.movies);
              } else {
                console.log('++== Added to movietyope', data.movies);
                movieCache[type] = data.movies;                
              }
					   // console.log('yes', data);
					  }).
					  error(function(data, status, headers, config) {
					    // called asynchronously if an error occurs
					    // or server returns response with an error status.
						//	console.log('OOOOpps', data);

					  });        

    };

    dataFactory.doSearch = function (searchTerm) {

	    		var apiurl = APIProvider.doSearch(searchTerm);
	    	
	        return $http.jsonp(apiurl).
					  success(function(data, status, headers, config) {
					    // this callback will be called asynchronously
					    // when the response is available
					    movieCache['search'] = data.movies;
					   // console.log('yes', data);
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

		//console.log('MAKE THIS CALL for: ' + apiurl);
  	return apiurl;
	}

	var type = 'search';

	obj.doSearch = function(term) {
		apiurl = config.baseUrl + config[type]+ '?apikey='+config.apikey+'&page_limit='+limit+'&q='+term+'&callback=JSON_CALLBACK';
		//console.log('MAKE THIS CALL for: ' + apiurl);
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
      //console.log('Will remove pos %a from %b', index, key);
      //console.log('Sepearate %s', separator);
      var list = $localstorage.get(key, '');
      //console.log(list)

      var list_array = list.split(separator);
      //console.log(list_array);
      list_array.splice(index, 1);
      //SAVE BACK to local storage

      $localstorage.set(key,list_array.join(separator));

      //return $window.localStorage[key] || defaultValue;
    },
    list: function(key) {
      var list = $localstorage.get(key, '');
      // explode to an array
     // console.log(" this is list %s", list);
      var list_array =[];
      
      if(list !== '') {
        list_array = list.split("|");
        console.log("list not enough to space");
      } 
      var i;

     //  console.log('List array length: ' + list_array.length);
     //  console.log(list_array);


      for(i =0; i <list_array.length; i++) {
        console.log(i);
        //var example = "'" + list_array[i] + "'";
        var example = list_array[i];
      //  console.log(example);
        list_array[i] = JSON.parse(example);
        //list_array[i] = example;
      }
     // console.log('this is sthe list array');
      console.log(list_array);
      return list_array;
      //explose on separator and return as array

    }, 
    getStore: function() {
      return list_array;
    },
    find: function(key, id) {
      //console.log('Im looking for something %s', id);
      var metest = this.list(key);
      //console.log('----- metest here');
      //console.log(metest[id]);
      return metest[id];

    }
  }

}]);