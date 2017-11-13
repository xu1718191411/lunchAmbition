module.controller('mainCtrl', function ($scope) {
    // ここにJavaScriptを利用した、動的なアプリの動作を書いていきます

    $scope.moveToPage = function(page) {
        if (page === "page1") {
            pageNavigator.pushPage('page1.html');
        }else if(page==='back'){
            pageNavigator.popPage(); //1つ前の画面に戻る
        }
    }

});


module
  .controller('SplitterController', function() {
    this.load = function(page) {
      mySplitter.content.load(page)
        .then(function() {
          mySplitter.left.close();
        });
    };
  });



  module
    .controller('GoogleMapController', function($scope,NgMap) {
          $scope.name = "syoui"

           var vm = this;
            vm.types = "['establishment']";
            $scope.name = "syoui"

            var geocoder = new google.maps.Geocoder();
            vm.geocoder = geocoder;


            $scope.search = function() {
              searchFromKeyWords($scope.address)
            }


            NgMap.getMap().then(function(map) {
              allowCurrentLocation(map)
              vm.map = map;

            });

             
             searchFromKeyWords = function(text){
                    $scope.positions =[];
                    vm.geocoder.geocode({country: 'JP','address': text}, function(results, status) {

                      $scope.$apply(function(){
                          if (status === 'OK') {
                            vm.map.setCenter(results[0].geometry.location);
                            console.log("results",results);
                            for(var i=0;i<results.length;i++){
                                    // var marker = new google.maps.Marker({
                                    //   map: vm.map,
                                    //   position: results[i].geometry.location
                                    // });
                                    var pos = [results[i].geometry.location.lat(),results[i].geometry.location.lng()]
                                    var obj = {pos:pos,name:text}
                                    $scope.positions.push(obj)
                                    console.log($scope.positions)
                            }

                          } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                          } 
                      })

                    }); 

              }


            function allowCurrentLocation(map){
              var infoWindow = new google.maps.InfoWindow({map: map});

              // Try HTML5 geolocation.
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                  var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  };

                  infoWindow.setPosition(pos);
                  infoWindow.setContent('現在地');
                  map.setCenter(pos);
                }, function() {
                  handleLocationError(true, infoWindow, map.getCenter());
                });
              } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
              }
            }


            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
              infoWindow.setPosition(pos);
              infoWindow.setContent(browserHasGeolocation ?
                                    'Error: The Geolocation service failed.' :
                                    'Error: Your browser doesn\'t support geolocation.');
            }




    });








