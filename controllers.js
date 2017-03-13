// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
    
    //default city
    $scope.cityName = "Toronto, Ontario";
    console.log("initial service " + cityService.cityName);
    //list to populate the select element
    $scope.names = [{id:"1",name:"Calgary, Alberta", value:"Calgary,Canada"}, {id:"2",name:"Montreal, Quebec", value:"Montreal,Canada"},{id:"3",name:"Ottawa, Ontario", value:"Ottawa,Canada"}, {id:"4", name:"Toronto, Ontario", value:"Toronto,Canada"},{id:"5",name:"Winnepeg, Manitoba", value:"Winnepeg,Canada"}];
    
    //submission of form goes to forecast fragment hash
    $scope.submit = function() {
        $location.path("/forecast");
    };
    
    //called when the select's option changes
    $scope.changedValue=function(item){
        $scope.cityName = item.value;//city field to pass to api
        console.log("home changed " +$scope.cityName);
     };
    
    //manual watcher for cityName
      $scope.$watch('cityName', function() {
       cityService.cityName = $scope.cityName; 
          console.log("service " + cityService.cityName);
    });
    
    //$scope.cityName = cityService.cityName;
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    
    $scope.cityName = cityService.cityName;
    console.log("forcast " + $scope.cityName);
    
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=2fb3abccd2d5eca857f2fab50f7f0192", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.cityName, cnt: $scope.days }); //get cityName and for specified days
    
    $scope.convertToFahrenheit = function(degK) {
        
        return Math.round(degK - 273.15) + '\u00B0C'; //add degree sign and C to the temp
        
    }
    
    $scope.convertToDate = function(dt) { 
      
        return new Date(dt * 1000);  //number gotten back from api is in ms so * by 1000
        
    };
    
}]);