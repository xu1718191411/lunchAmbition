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
            vm.placeChanged = function() {
              $scope.searchFromKeyWords(vm.address)
              // vm.place = this.getPlace();
              // if(vm.place == undefined) return;
              // if(vm.place.geometry == undefined) return;
              // console.log('location', vm.place.geometry.location);
              // vm.map.setCenter(vm.place.geometry.location);
            }

            NgMap.getMap().then(function(map) {
              vm.map = map;
              var geocoder = new google.maps.Geocoder();
              vm.geocoder = geocoder;


              $scope.searchFromKeyWords = function(text){

                        vm.geocoder.geocode({'address': text}, function(results, status) {
                          if (status === 'OK') {
                            vm.map.setCenter(results[0].geometry.location);
                            console.log("results",results);
                            for(var i=0;i<results.length;i++){
                                    var marker = new google.maps.Marker({
                                      map: vm.map,
                                      position: results[i].geometry.location
                                    });
                            }

                          } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                          }
                        });         
              }


        });

    });








