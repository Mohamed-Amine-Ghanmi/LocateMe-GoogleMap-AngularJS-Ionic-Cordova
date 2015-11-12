angular.module('ionic.example', ['ionic'])

    .controller('MapCtrl', function($scope, $ionicLoading, $compile) {
      
      

      function initialize() {
        $scope.myLatlng = new google.maps.LatLng(36.8908526,10.185072900000023);
        
        
        var mapOptions = {
          center: $scope.myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        /*var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);*/

        $scope.infowindow = new google.maps.InfoWindow({
          //content: compiled[0]
          content: 'Position : '+$scope.myLatlng
        });

        $scope.marker = new google.maps.Marker({
          position: $scope.myLatlng,
          map: $scope.map,
          title: 'Mohamed Amine Ghanmi'
        });

        google.maps.event.addListener($scope.marker, 'click', function() {
          $scope.infowindow.open($scope.map,$scope.marker);
        });

      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          $scope.map.setCenter($scope.myLatlng);
          $scope.marker = new google.maps.Marker({
          position: $scope.myLatlng,
          map: $scope.map,
          title: 'MAG'
          });

          $scope.infowindow.setContent('Position : '+$scope.myLatlng);
          google.maps.event.addListener($scope.marker, 'click', function() {
          $scope.infowindow.open($scope.map,$scope.marker);});

          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      

      /*$scope.clickTest = function() {
        alert('My Current Position is : '+$scope.myLatlng)
      };*/
      
    });