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
              vm.place = this.getPlace();
              console.log('location', vm.place.geometry.location);
              vm.map.setCenter(vm.place.geometry.location);
            }

            NgMap.getMap().then(function(map) {
              vm.map = map;
            });


    });